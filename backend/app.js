// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// ✅ List Models Route
app.get("/listmodels", async (req, res) => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching models:", err.response?.data || err.message);
    res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        err.message ||
        "Failed to fetch models",
    });
  }
});

// ✅ Gemini Chat Route
app.post("/chatbot", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const model = "models/gemini-1.5-flash"; // you can switch via /listmodels

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      res.json({ response: text });
    } else {
      res.status(500).json({ error: "No response text returned by Gemini" });
    }
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);

    if (err.response?.data?.error?.status === "RESOURCE_EXHAUSTED") {
      return res
        .status(429)
        .json({ error: "Quota exceeded. Please wait or upgrade quota." });
    }

    res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        err.message ||
        "Gemini API call failed",
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
