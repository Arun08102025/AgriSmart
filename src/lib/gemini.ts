import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateCropRecommendations(soilData: Record<string, unknown>, userLocation: Record<string, unknown> | null, language: string = "en") {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }); 
  
  // Note: Using 1.5 Pro to approximate 3.1 Pro depending on availability in the loaded SDK version
  
  const prompt = `
  You are an expert AI agronomist for Indian farmers. 
  Given the following soil parameters:
  - pH Level: ${soilData.ph_level}
  - Nitrogen (kg/ha): ${soilData.nitrogen}
  - Phosphorus (kg/ha): ${soilData.phosphorus}
  - Potassium (kg/ha): ${soilData.potassium}
  - Organic Carbon (%): ${soilData.organic_carbon || "Not measured"}

  Please recommend the top 3 crops most suitable for these conditions.
  Provide the output strictly in valid JSON format with the following structure:
  {
    "recommendations": [
      {
        "crop_name": "String",
        "confidence_score": "Number between 0 and 100",
        "justification": "A brief explanation of why this crop is suitable (in ${language})"
      }
    ]
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON block from markdown if wrapped
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate recommendations");
  }
}
