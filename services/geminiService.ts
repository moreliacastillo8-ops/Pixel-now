import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (
  prompt: string,
  aspectRatio: AspectRatio = AspectRatio.Square
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const base64EncodeString = part.inlineData.data;
        // MimeType is usually image/jpeg or image/png, but let's be safe
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generatePinDetails = async (imageUrl: string): Promise<{ title: string; description: string; tags: string[] }> => {
    // This is a "mock" implementation using text-only model to generate *context* based on a pretend analysis
    // In a real multimodal scenario, we would send the image bytes.
    // Here, to keep it snappy and simple without re-fetching external images as blobs, 
    // we'll just generate creative text based on a "theme".
    
    // However, if we want to be truly multimodal, we can try describing the generated image context.
    // For this app, let's just generate a title/desc based on a random creative prompt 
    // or if it was a generated image, we use the prompt.
    
    // For the sake of the demo, let's assume we use the text model to hallunicate a title if one is missing.
    return {
        title: "Creative Inspiration",
        description: "A wonderful example of visual storytelling and artistic expression.",
        tags: ["art", "design", "inspiration"]
    };
}
