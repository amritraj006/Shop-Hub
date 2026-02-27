const Stripe = require('stripe');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function test() {
    try {
        console.log("Testing Stripe with Secret Key:", process.env.STRIPE_SECRET_KEY ? "EXISTS" : "MISSING");
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log("Success! Client Secret:", paymentIntent.client_secret);
    } catch (error) {
        console.error("FAILED!");
        console.error("Message:", error.message);
        console.error("Type:", error.type);
    }
}

test();
