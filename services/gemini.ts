
import { GoogleGenAI, Type } from "@google/genai";
import { Message, SocialPost } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (history: Message[]) => {
  const ai = getClient();

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    return response.text || "I'm having a bit of a glitch in the mainframe. Can you try asking that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The neon grid is experiencing high latency. Please try again in a moment.";
  }
};

export const fetchLatestSocialPosts = async (): Promise<SocialPost[]> => {
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find recent public posts by "Hans-Peter Martini" on LinkedIn and X (Twitter) handle "@hpm_dev".
      
      Search Queries to use:
      - site:linkedin.com/posts/ "Hans-Peter Martini"
      - site:x.com/hpm_dev
      
      Attempt to extract the 3 most recent posts. 
      If strict scraping fails due to login walls, return an empty array [] immediately.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              url: { type: Type.STRING },
              date: { type: Type.STRING },
              source: { type: Type.STRING }
            },
            required: ["content", "url", "source"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch social posts:", error);
    return [];
  }
};
