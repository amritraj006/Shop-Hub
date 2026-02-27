import express from "express";
import {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    updateProduct,
    deleteProduct,
    addProduct
} from "../controllers/adminController.js";

const router = express.Router();

// Stats route
router.get("/stats", getDashboardStats);

// Orders routes
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

// Products routes
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/add-product", addProduct);

export default router;