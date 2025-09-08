import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted successfully!`);
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting data:", err);
    mongoose.connection.close();
  }
};

run();
