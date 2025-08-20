import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // This will work in both client and server
});

const config = {
  temperature: 1,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024,
  responseModel: "text/plain",
};

// const model = "learnlm-2.0-flash-experimental";
const model = "gemini-2.0-flash-lite";

export async function generateIdeas(prompt) {
  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    let result = "";
    for await (const chunk of response) {
      if (chunk.text) result += chunk.text;
    }

    // clean code fences
    result = result.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = { ideas: [result || "No valid response"] };
    }

    return parsed;
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
}

