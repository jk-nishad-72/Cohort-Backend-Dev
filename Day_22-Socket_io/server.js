

require('dotenv').config()

const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");


const genrateResponse = require('./src/service/ai.service')
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });




io.on("connection", (socket) => {
  // ...


  console.log("A user connected ")
//* in build events 
  socket.on("disconnected",()=>{
  console.log("A user disconnected ")
  })

//* custom events  name koi bhhi likh sakte hai 
/*  isme hamne message name diya hai 
 *  data share bhi kr sakte hai 
 * jo callback function me milta hai 
 * normal text form and json , and binary form me share kar sakte hai 
 * 
 */


  socket.on('message',(data)=>{

    console.log(data);
  })


// socket.on('ai-message',async(data)=>{

//     console.log("Received AI message: " , data.prompt);
//     const response  = await genrateResponse(data.prompt)
//     console.log("AI Response ",response)
//     socket.emit('ai-message-response',{response})
// })


});


httpServer.listen(3000,()=>{

    console.log("Server running at port 3000")
})