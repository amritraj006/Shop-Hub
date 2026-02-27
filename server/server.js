import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));

// Default routes
app.get("/", (req, res) => res.send("API is running"));
app.get("/home", (req, res) => res.send("Welcome to Shop Hub"));

// Auth routes
app.use("/api/auth", authRoute);

// Profile routes
app.use("/api/profile", profileRoute);

// Product routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoute);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
