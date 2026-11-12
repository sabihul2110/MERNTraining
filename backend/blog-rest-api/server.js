/**
 * Blog REST API Server Entry Point
 * Initializes Express middleware, API routes, and MongoDB connection.
 */

const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is required.");
}

const app = express();

// Request parsing middleware
app.use(express.json());
app.use(cookieParser());

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Blog REST API is up and running.",
  });
});

// Feature route mounts
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// Connect to MongoDB before listening for incoming requests
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
