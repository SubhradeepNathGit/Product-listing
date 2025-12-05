require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const connectDB = require("./app/config/db");

// Middleware
const errorHandler = require("./app/middleware/errorHandler");

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "app", "uploads")));

// Routes
const productApiRoute = require("./app/routes/productApi");
app.use("/api", productApiRoute);

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "E-Commerce APIs are running successfully",
  });
});

// Global Error Handler (must be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
