import express from "express";
import { addProduct } from "../controllers/adminController.js";

const router = express.Router();

// Add Product Route
router.post("/add-product", addProduct);

export default router;