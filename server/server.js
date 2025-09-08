import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js";

dotenv.config();
await connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(clerkMiddleware());

// Default routes
app.get("/", (req, res) => res.send("API is running"));
app.get("/home", (req, res) => res.send("Welcome to Shop Hub"));


app.use("/api/inngest", serve({ client: inngest, functions }));

// Product routes ggghhh hhhhvvgvvvvv
app.use("/api/products", productRoutes); // use plural "products" for consistency

app.use("/api/cart", cartRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
