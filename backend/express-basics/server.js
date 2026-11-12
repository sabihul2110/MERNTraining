/**
 * Express.js Starter Server
 * Demonstrates basic Express application initialization and JSON route handling.
 */

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Sample GET endpoint returning a JSON status message
app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Express test endpoint is working properly.",
  });
});

app.listen(PORT, () => {
  console.log(`Express server is listening on http://localhost:${PORT}`);
});
