
import { GoogleGenAI } from "@google/genai";

export const getClinicalInterpretation = async (scoreType: string, score: number, details: any) => {
  // Use process.env.API_KEY directly as per Gemini API coding guidelines. 
  // It is assumed to be pre-configured and valid in the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const prompt = `
      Ти - досвідчений лікар інтенсивної терапії (реаніматолог). Надай лаконічну клінічну інтерпретацію (2-3 речення) українською мовою для наступних даних:
      Тип шкали: ${scoreType}
      Загальний бал: ${score}
      Деталі стану пацієнта: ${JSON.stringify(details)}
      
      Зосередься на клінічних наслідках, потенційному ризику або необхідному рівні інтенсивності догляду. 
      Відповідь має бути у форматі професійної медичної замітки українською мовою.
    `;

    // Use generateContent directly as per SDK requirements
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Property .text returns the string output directly
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Не вдалося отримати ШІ-аналіз. Будь ласка, оцініть стан клінічно.";
  }
};
