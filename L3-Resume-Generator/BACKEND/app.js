const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Add more detailed console logging
app.use((req, res, next) => {
  console.log("----------------------------------------");
  console.log("New Request at:", new Date().toISOString());
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request Body:", JSON.stringify(req.body, null, 2));
  console.log("----------------------------------------");
  next();
});

//GEMINI CONTROLLER
const geminiController = require("./controllers/geminiController.js");
app.use("/api", geminiController);

// ROUTES
app.get("/", (req, res) => {
  res.send("The Resume Generator");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
