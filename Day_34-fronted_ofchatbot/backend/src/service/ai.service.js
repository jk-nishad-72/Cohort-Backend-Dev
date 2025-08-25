
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text
}

async function generVector(prompt) {
const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: prompt,
        config:{
          outputDimensionality:768
        }
    });

    // console.log(response.embeddings);

    return (await response).embeddings[0].values

    
}


module.exports = {generateResponse,generVector}

