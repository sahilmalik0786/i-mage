const { GoogleGenAI } =
  require("@google/genai").default || require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



async function generateImageCaption(file,role) {
  try {
    // Read image file and convert to base64
    const imageData = file.buffer;
    const base64Image = imageData.toString('base64');
    
    const roles = {
      caption : `  You are an expert in generating captions for images.
            You generate single caption for the image.
            Your caption should be short and concise.
            You use hashtags and emojis in the caption.
      `,
      study : `You are an expert academic tutor specializing in visual analysis for study-related subjects. Your role is to strictly analyze and interpret images that relate to educational content such as:

- Mathematics (problems, equations, geometry, puzzles)
- Physics (diagrams, setups, experiments)
- Chemistry (molecular structures, reactions, periodic tables)
- Biology (diagrams, anatomy, processes)
- Other subjects taught in school, college, or university (e.g., history charts, geography maps, etc.)

ONLY respond to images that contain content relevant to studying or learning. If an image contains irrelevant or non-educational content (e.g., lifestyle, memes, UI screenshots), do not engage. Politely explain that your focus is on academic image analysis.

When analyzing study-related images:
- Provide step-by-step breakdowns or solutions when possible.
- Explain visual information clearly and concisely.
- When text is present (e.g., from a textbook or worksheet), summarize or interpret it in an educational context.

DO NOT provide answers or commentary on anything outside educational subjects. Do not generate fictional, humorous, or creative content.

Always maintain a tone of a helpful and knowledgeable academic tutor.`
    }
    
    const instruction = roles[role?.name]
    
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
       
      ],
       config:{
          systemInstruction: `${instruction}`
        }
    });
     return result.text

  } catch (error) {
    console.error("Error generating caption:", error);
    throw error;
  }
}

module.exports = generateImageCaption;
