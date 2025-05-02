const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for API key or fall back to a default key
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCY55Lx8w5nTjYWXjNcu212IrheeLp-P0c"; // Replace or use .env

// List Models Route
app.get('/listmodels', async (req, res) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models:ListModels?key=${API_KEY}`,
            {}
        );
        res.json(response.data);  // Return the available models to the client
    } catch (err) {
        console.error('Error fetching models:', err.response?.data || err.message);
        res.status(500).json({
            error: err?.response?.data?.error?.message || err.message || 'Failed to fetch models'
        });
    }
});

// Gemini Chat Route
app.post('/geminichat', async (req, res) => {
    const { prompt } = req.body;

    // Validate the incoming prompt
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log("Received Prompt:", prompt);  // Log the incoming prompt

    try {
        // Update the correct model once you have the available models
        const model = 'gemini-2.0-flash'; // Replace with the correct model after checking ListModels

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );

        // Log the full response for debugging
        console.log("Gemini API Response:", JSON.stringify(response.data, null, 2));

        // Extract the text content from the response
        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            res.json({ response: text });  // Send back the Gemini response
        } else {
            res.status(500).json({ error: 'No response text returned by Gemini' });
        }
    } catch (err) {
        // Log the error for debugging
        console.error('Gemini API Error:', err.response?.data || err.message);

        // Send a more detailed error message back to the client
        res.status(500).json({
            error: err?.response?.data?.error?.message || err.message || 'Gemini API call failed'
        });
    }
});

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
