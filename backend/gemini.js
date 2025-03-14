import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Access API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDwjoAuxneLyup9X9q1Wb8B3UpvG3_izik';
const MODEL_NAME = "gemini-1.5-pro";

// Check if API key is available
if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not set in environment variables");
}

console.log("Initializing Gemini with API key:", API_KEY ? "API key is set" : "API key is missing");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.75,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function runChat(prompt) {
  try {
    console.log(`Processing prompt: "${prompt.substring(0, 50)}..."`);
    
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const responseText = response.text();
    
    console.log(`Generated response of length: ${responseText.length} characters`);
    
    return responseText;
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

export default runChat;