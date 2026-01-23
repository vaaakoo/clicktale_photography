
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (preferences: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a local Santorini photography expert. Based on these user style preferences: "${preferences}", suggest a perfect 2-hour photo session itinerary in Santorini. Include specific locations (like Oia Castle, Blue Domes, Imerovigli rooftops), the best time for lighting, and tips for avoiding crowds. Keep it concise, professional, and inspiring. Formatting: Use Markdown with bold headers.`,
    });
    // The response.text property directly returns the string output.
    return response.text || "Sorry, I couldn't generate an itinerary right now. Please try again later.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating plan. Please ensure you have a valid API connection.";
  }
};
