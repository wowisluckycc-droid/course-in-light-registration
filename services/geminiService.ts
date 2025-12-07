import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing from environment variables");
        // Returning a mock client or handling error gracefully in a real app
    }
    return new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
};

export const generateAffirmation = async (name: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Fallback if no API key is present (for demo purposes if env not set)
    if (!process.env.API_KEY) {
       return `${name}，歡迎來到光的課程。願你在這段旅程中找到內在的平靜與喜悅，光與愛將時刻伴隨著你。`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, warm, spiritual, and encouraging affirmation or blessing for a student named "${name}" who has just registered for "A Course in Light: Planetary 1" (光的課程 行星一). 
      
      The tone should be ethereal, peaceful, and empowering. 
      Mention "Light" (光) and "Planetary journey" (行星旅程).
      Language: Traditional Chinese (Taiwan).
      Length: Approximately 30-50 words.
      Do not use markdown formatting. Just plain text.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "願光與愛與你同在。";
  } catch (error) {
    console.error("Error generating affirmation:", error);
    return `${name}，歡迎來到光的課程。願你在這段旅程中找到內在的平靜與喜悅。`;
  }
};