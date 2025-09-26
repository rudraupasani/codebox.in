// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cron = require("node-cron");
const fetch = require("node-fetch"); // ✅ for self-ping
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔧 Clean AI responses
function cleanResponse(text) {
  if (!text) return "";
  // Remove "Codebox AI:" at start (case-insensitive, trims spaces)
  return text.replace(/^Codebox[\s\u00A0]*AI:\s*/i, "").trim();
}

// Load API key from .env
const API_KEY =
  process.env.GEMINI_API_KEY ||
  "AIzaSyDaLNBNnTOHHYeLcqjpXFZZfjvc4FB-8bs"; // ⚠️ keep secret in .env

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
      res.json({ response: cleanResponse(text), model: selectedModel });
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

// ✅ Groq Chat Route
const APII_KEY =
  process.env.GROK_API_KEY ||
  "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"; // ⚠️ keep secret in .env

app.post("/response", async (req, res) => {
  const { prompt: userPrompt } = req.body;
  if (!userPrompt) return res.status(400).json({ error: "Prompt is required" });

  const finalPrompt = `You are Codebox AI, a highly skilled and friendly coding assistant.

Explain programming concepts clearly with examples.
Provide working code snippets in multiple languages (JS, Python, C, C++, Java, etc.).
Share relevant YouTube video links, tutorials, and documentation websites when helpful.
Format all code cleanly using markdown blocks.
Debug errors step by step and suggest fixes.
Suggest practical project ideas with code examples when asked.
Always be concise, structured, and helpful.
If the user’s request is unclear, ask clarifying questions before answering.
Provide code reviews and feedback on best practices.
Generate code based on user input.
Translate code from one programming language to another.
Explain how code works, including step-by-step breakdowns and examples.
Suggest project templates and examples to help users get started.
Response should not include your name or any references to being an AI model.

User request: ${userPrompt}`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/responses",
      {
        model: "openai/gpt-oss-120b",
        input: [{ role: "user", content: finalPrompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${APII_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const outputArray = response.data.output || [];
    let responseData = "No response from Groq API";

    for (const item of outputArray) {
      if (item.content && item.content.length > 0) {
        // Find the first text content
        const textContent = item.content.find(
          (c) => c.type === "output_text" || c.type === "text"
        );
        if (textContent && textContent.text) {
          responseData = textContent.text;
          break;
        }
      }
    }

    res.json({ response: cleanResponse(responseData) });
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        err.message ||
        "Groq API call failed",
    });
  }
});

// ✅ Keep-alive CRON job (every 12 minutes)
cron.schedule("0 */12 * * * *", async () => {
  try {
    const url = `https://codebox-d3m9.onrender.com/response`; // replace with your Render URL
    await fetch(url);
    console.log(`[CRON] Pinged ${url} to keep server alive`);
  } catch (err) {
    console.error("[CRON] Error pinging server:", err);
  }
});

cron.schedule("0 */12 * * * *", async () => {
  try {
    const url = `https://codebox-d3m9.onrender.com/chatbot`; // replace with your Render URL
    await fetch(url);
    console.log(`[CRON] Pinged ${url} to keep server alive`);
  } catch (err) {
    console.error("[CRON] Error pinging server:", err);
  }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
