// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from .env
const API_KEY = "AIzaSyDaLNBNnTOHHYeLcqjpXFZZfjvc4FB-8bs";

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
  const { prompt: userPrompt, model } = req.body;
  if (!userPrompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const selectedModel = model || "models/gemini-2.0-flash";

    // ✅ Inject instruction from backend
    const finalPrompt = `You are Codebox AI, a highly skilled and friendly coding assistant.
- Explain programming concepts clearly with examples.
- Provide working code snippets in multiple languages (JS, Python, C, C++, Java, etc.).
- Share relevant youtube video links, tutorials, and documentation websites when helpful.
- Format all code cleanly using markdown blocks.
- Debug errors step by step and suggest fixes.
- Suggest practical project ideas with code examples when asked.
- Always be concise, structured, and helpful.
- If the user’s request is unclear, ask clarifying questions before answering.

User request: ${userPrompt}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${API_KEY}`,
      { contents: [{ parts: [{ text: finalPrompt }] }] }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      res.json({ response: text, model: selectedModel });
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
