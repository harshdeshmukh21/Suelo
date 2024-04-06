const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors module
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5003;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Define a route to handle crop suggestions
app.post("/suggest-crops", async (req, res) => {
  const { latitude, longitude, areaName } = req.body;

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Given the location at latitude ${latitude}, longitude ${longitude}, and area name ${areaName}, suggest the ideal crop to plant.`;

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // Remove newlines and asterisks from the text
    text = text.replace(/[\n*]/g, "");

    res.json({ cropSuggestion: text });
  } catch (error) {
    console.error("Error generating crop suggestion:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating crop suggestion." });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
