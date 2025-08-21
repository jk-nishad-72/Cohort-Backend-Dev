
const {Server} = require('socket.io')
const cookie = require('cookie')
const jwt  = require('jsonwebtoken')
const userAuthModel = require('../models/d32auth.model')
const messageModel = require('../models/message.model')
const {generateResponse,generateVectors}  = require('../services/ai.service')
const {creatMemory,queryMemory} = require('../services/vector.service')
const { text } = require('express')


async function serverSocket(httpServer) {


    const io = new Server(httpServer, { /* options */ });

     io.use(async ( socket,next)=>{
     
         const cookies =  cookie.parse(socket.handshake.headers?.cookie || "");
         if(!cookies.token){
            next(new Error("Authentication error : NO token provided"));
         }
         try{
            const decode =  jwt.verify(cookies.token,process.env.JWT_SECRET_KEY)
             const user = await userAuthModel.findById(decode.id)
             socket.user  = user
             next()
         }catch(error){
            next(new Error("Authentication error : NO token provided"));
         }
         
     })

io.on("connection", (socket) => {
  
     
    socket.on('ai-message',async(messagePaload)=>{



            //  console.log(messagePaload)

            //* storing messages creating chat history 

        const messageDB =    await messageModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:messagePaload.content,
                role:'user'
            })

            //* convert into vectors 

            const vectorData = await generateVectors(messagePaload.content)

            // *console.log(vectorData)

            await creatMemory({
                vectors:vectorData,
                messageId:messageDB._id,
                metadata:{
                    chat:messagePaload.chat,
                    user:socket.user._id,
                    text:messagePaload.content,
                }
            })


            // * long term memory 

            const memory = await queryMemory({
                queryVector:vectorData,
                limit:5,
                metadata:{}
            })

            console.log(memory)



            const chatHistory = (await messageModel.find({
                chat:messagePaload.chat,
            }).sort({ createdAt: -1 }).limit(5).lean()).reverse()



         const stm =   chatHistory.map(item=>{
                return {
                    role:item.role,
                    parts:[{text:item.content}]
                }
             })

             const ltm = [
                {
                    role:'user',
                    parts:[{text:`

                          these are some previous messages from the chat, use them to generate a response
                          ${memory.map(item=>item.metadata.text).join('\n') }
                        `}]
                    }
             ]

             console.log(ltm[0])
             console.log(stm)

             const response = await generateResponse([...ltm,...stm])


             // response ko mongodb me store kiya for stm 
          const messageResponseDb=   await messageModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:response,
                role:'model'
             })

        //* response ko bhi vector me convert karenge 
              
        const  responseVectorData = await generateVectors(response)
             await creatMemory({
                vectors:responseVectorData,
                messageId:messageResponseDb._id,
                metadata:{
                    chat:messagePaload.chat,
                    user:socket.user._id,
                    text:response
                }
             })

             //* event for sending response

             socket.emit('ai-response',{
                  content:response ,
                  chat: messagePaload.chat
             })

          
    })
    




});
    
}

module.exports = serverSocket


