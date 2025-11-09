const  { createServer } = require("http");
const { Server } = require("socket.io");
const app = require('./app')
const { generateResponse } = require("./src/service/ai.service");



const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...

  console.log('A user Connected ');


    


  

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

   socket.on('ai-message',async(data)=>{

    console.log(data.prompt);
    
        const aiResponse = await  generateResponse(data.prompt);

        console.log(aiResponse);


        socket.emit('ai-message-response',{response:aiResponse});
        


   })

   



});


app.get('/',(req,res)=>{

    res.send('Hello from server');  
}) 

httpServer.listen(3000,()=>{

     console.log('Server running at 3000');
     
})