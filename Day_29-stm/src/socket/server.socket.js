
const {Server} = require('socket.io')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const authModel = require('../models/auth.model');
const aiService = require('../services/ai.service')
const messageModel = require('../models/message.model')

async function socketServer(httpServer) {
    
    
const io = new Server(httpServer, { /* options */ });



io.use(async (socket,next)=>{

     const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    //   const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    //  console.log(cookies.token)

     if(!cookies.token){

        next(new Error("Authentication error : No token provided"));
     }

     try{

        const decode = jwt.verify(cookies.token,process.env.JWT_SECRET_KEY)

         const user = await authModel.findById(decode.id)

         socket.user = user
         next()
         
     }
     catch(error){

        next(new Error("Authentication error:Invalid error"))

     }



})

io.on("connection", async(socket) => {

//* socket.user me user store kiye the jiska token hame mila tha ab jis user ne connect kiya hai us user ke detail show ho jayenge

    // console.log("New connection ",socket.user)
    // console.log("New connection ",socket.id)

    socket.on("ai-message",async(messagPayload)=>{

        //  console.log(messagPayload)

        await messageModel.create({
            user:socket.user._id,
            chat:messagPayload.chat,
            content:messagPayload.content,
            role:"user"
        })

        const chatHistory = await messageModel.find({
            chat:messagPayload.chat
        }.sort({ createdAt: -1 }).limit(20).lean()).reverse()

       const response = await aiService.generatResponse(chatHistory.map(item=>{
         return{
            role:item.role,
            parts:[{text:item.content}]
         }
       }))

     

    // console.log(response)

    await messageModel.create({
        user:socket.user._id,
        chat:messagPayload.chat,
        content:response,
        role:"model"
    })
    socket.emit('ai-response',{
        content:response,
        chat:messagPayload.chat
    })
           
    })


});
}


module.exports = socketServer