require('dotenv').config();

const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateContent = require('./src/service/ai.service')
const { text } = require('stream/consumers');

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:5173", // Adjust 
    }
});


//* implementing short term memory jo chatHistory hai 


const chatHistory = [];

io.on("connection", (socket) => {
  


    console.log('A new User Connected')
    
    socket.on('disconnected',()=>{
        console.log("A user disconnected")
    })

  //* ai-message 
socket.on('ai-message',async(data)=>{

    console.log("ai-message received",data)

    chatHistory.push({
        role:"user",
        parts:[{text:data}]
    })


    //* ai-message-response 
    const response = await generateContent(chatHistory)

     chatHistory.push({
        role:"model",
        parts:[{text:response}]
     })
      socket.emit('ai-message-response',response)
} )

});

httpServer.listen(3000,()=>{
    console.log("Server running at port 3000")
})