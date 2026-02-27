import express from "express";
import { createOrder, getUserOrders, createPaymentIntent } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", protect, createPaymentIntent);
router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);

export default router;
