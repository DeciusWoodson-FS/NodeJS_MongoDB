//Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Import routes
const storeRoutes = require("./server/routes/storeRoutes");
const productRoutes = require("./server/routes/productRoutes");

//Initialization
const app = express();
const PORT = process.env.PORT || 3000;

//Enable CORS for all routes
app.use(cors());
app.use(express.json());

//Database connection 
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err.message))

//API routes
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});