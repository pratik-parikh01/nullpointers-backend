require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

// Middleware to allow all API origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Increase the limit to 10mb (adjust as needed)
app.use(express.json({ limit: '10mb' }));

// Import and use all routes from routes/index.js
app.use("/api", routes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  console.log("Hurrey !! its working");
  res.send("Hurrey !! its working ");
});

// 404 handler - Add this before error middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware - Add this before app.listen
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Return error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
