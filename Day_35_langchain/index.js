import { config } from "dotenv";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


config()



const model =new ChatGoogleGenerativeAI({
     model:'gemini-2.0-flash',
     apiKey:process.env.GEMINI_API_KEY
})


model.invoke('hello ai who are you').then((response) => {
    console.log(response.content);
    
}).catch((err) => {
    console.log(err)
});
