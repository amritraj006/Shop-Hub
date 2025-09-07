import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(clerkMiddleware());

// Connect to MongoDB
await connectDB();

// Default route
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/inngest", serve({ client: inngest, functions }));


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
