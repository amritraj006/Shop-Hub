import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
// @desc    Create new order & process dummy payment
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isBuyNow = Boolean(req.body.buyNowItem);

        // Ensure there is something to checkout (either Buy Now or Cart items)
        if (!isBuyNow && user.cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // 1. Validate items and calculate total
        let totalAmount = 0;
        const orderItems = [];

        // Define which array of items we are processing
        const itemsToProcess = isBuyNow ? [req.body.buyNowItem] : user.cart;

        for (const item of itemsToProcess) {
            // For Buy Now, frontend might pass productId. For Cart, it's already structured as item.productId
            const lookupId = item.productId || item.product;
            const product = await Product.findById(lookupId);

            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                size: product.size,
                quantity: item.quantity,
                price: product.price
            });
        }

        // 2. Create the Order securely
        const order = new Order({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            paymentMethod: req.body.paymentMethod || 'Card',
            paymentStatus: (req.body.paymentStatus === 'Success' || req.body.paymentStatus === 'Paid') ? 'Paid' : 'Pending',
            orderStatus: 'Processing'
        });

        const createdOrder = await order.save();

        // 3. Create dummy Payment Record
        const payment = new Payment({
            order: createdOrder._id,
            paymentMethod: createdOrder.paymentMethod,
            paymentStatus: (req.body.paymentStatus === 'Success' || req.body.paymentStatus === 'Paid') ? 'Success' : 'Pending',
            amountPaid: totalAmount,
            transactionId: req.body.transactionId || `DUMMY_TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        });
        await payment.save();

        // 4. Reduce stock dynamically using the schema method
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            await product.decreaseStock(item.quantity);
        }

        // 5. Clear User Cart (Only if they actually checked out their Cart)
        if (!isBuyNow) {
            user.cart = [];
            await user.save();
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: createdOrder,
            payment
        });

    } catch (error) {
        console.error("Create Order Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product', 'name image price')
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Get User Orders Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create Stripe payment intent
// @route   POST /api/orders/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isBuyNow = Boolean(req.body.buyNowItem);

        // Ensure there is something to checkout (either Buy Now or Cart items)
        if (!isBuyNow && user.cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // 1. Validate items and calculate total
        let subTotal = 0;
        const itemsToProcess = isBuyNow ? [req.body.buyNowItem] : user.cart;

        for (const item of itemsToProcess) {
            // For Buy Now, frontend might pass productId. For Cart, it's already structured as item.productId
            const lookupId = item.productId || item.product;
            const product = await Product.findById(lookupId);

            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            subTotal += product.price * item.quantity;
        }

        const shipping = subTotal > 150 ? 0 : 15;
        const tax = subTotal * 0.05; // 5% dummy tax
        const orderTotal = subTotal + shipping + tax;

        // Convert to cents for Stripe
        const amountInCents = Math.round(orderTotal * 100);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            metadata: {
                userId: req.user.id.toString(),
                isBuyNow: isBuyNow.toString(),
            }
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error("Create Payment Intent Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
