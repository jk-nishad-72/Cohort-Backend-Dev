

const  { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  
   return response.text
}



// * vector(embeddings me convert kerne vala code ai provide karta hai)

async function generateVectors(cotent) {

   const response = ai.models.embedContent(
    {
        model: 'gemini-embedding-001',
        contents:cotent,
        config:{
          outputDimensionality:768
        }
    }
   )
   return  (await response).embeddings[0].values

  
}

module.exports = { generateResponse , generateVectors}

