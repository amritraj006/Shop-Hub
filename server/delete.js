import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Delete all products
    const result = await Product.deleteMany({});

    console.log(`${result.deletedCount} products deleted successfully`);

    // Close connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error:", err);
  });