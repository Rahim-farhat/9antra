const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const courseRoutes = require("./routes/courseRoutes");

// Middleware for static files
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/courses", courseRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
