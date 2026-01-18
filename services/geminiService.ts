
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProtocol = async (proposal: {
  name: string;
  description: string;
  budget: number;
}) => {
  try {
    // Using gemini-3-pro-preview for complex reasoning and feasibility analysis tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this college event proposal for feasibility and protocol compliance.
      Event Name: ${proposal.name}
      Description: ${proposal.description}
      Budget: $${proposal.budget}
      
      Provide a constructive summary for the approval committee.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "Low, Medium, or High" },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            protocolIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
            overallScore: { type: Type.NUMBER, description: "1 to 10" }
          },
          required: ["riskLevel", "suggestions", "protocolIssues", "overallScore"]
        }
      }
    });

    // Access the text property directly (not a method) and trim whitespace before parsing JSON.
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini analysis failed", error);
    return null;
  }
};
