
import { GoogleGenAI } from "@google/genai";

export const getClinicalInterpretation = async (scoreType: string, score: number, details: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      Ти - досвідчений лікар інтенсивної терапії (реаніматолог). Надай лаконічну клінічну інтерпретацію (2-3 речення) українською мовою для наступних даних:
      Тип шкали: ${scoreType}
      Загальний бал: ${score}
      Деталі: ${JSON.stringify(details)}
      
      Зосередься на клінічних наслідках, потенційному ризику летальності або навантаженні на персонал. 
      Відповідь має бути у форматі професійної медичної замітки українською мовою.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Не вдалося отримати інтерпретацію ШІ. Будь ласка, керуйтеся клінічними протоколами.";
  }
};
