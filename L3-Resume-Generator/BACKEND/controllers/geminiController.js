const express = require("express");
const gemini = express.Router();
const { generateAIResponse } = require("../queries/gemini.js");

// GENERATE FROM TRANSCRIPT
gemini.post("/generate-from-transcript", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug the request body

    if (!req.body || !req.body.prompt) {
      return res
        .status(400)
        .json({ error: "No prompt provided in request body" });
    }

    const AIResponse = await generateAIResponse(req.body.prompt);
    console.log("Controller response:", AIResponse); // Debug the response

    res.json(AIResponse);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = gemini;
