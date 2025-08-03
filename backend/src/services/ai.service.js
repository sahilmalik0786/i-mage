const { GoogleGenAI } =
  require("@google/genai").default || require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateImageCaption(file) {
  try {
    // Read image file and convert to base64
    const imageData = file.buffer;
    const base64Image = imageData.toString('base64');

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        { text: "Caption this image." },
      ],
    });
     return result.text

  } catch (error) {
    console.error("Error generating caption:", error);
    throw error;
  }
}

module.exports = generateImageCaption;
