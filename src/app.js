require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
// Increase the limit to 10mb (adjust as needed)
app.use(express.json({ limit: '10mb' }));

// Import and use all routes from routes/index.js
app.use("/api", routes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Database connection data ::", data.connection);
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hurrey !! its working ");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
