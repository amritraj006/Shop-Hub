const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products"); // ✅ use require instead of import

// Connect to MongoDB
connectDB();

// 🚀 Insert function
const insertData = async () => {
  try {
    await Product.deleteMany(); // clear old data
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted successfully!`);
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting data:", err);
    mongoose.connection.close();
  }
};

insertData();
