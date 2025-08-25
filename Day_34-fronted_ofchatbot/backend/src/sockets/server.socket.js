const {Server} = require('socket.io');
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userAuthModel  = require('../models/d34auth.model');
// const { response } = require('../app');
const {generateResponse , generVector} = require('../service/ai.service')
const msdModel = require('../models/d34msg.model');
const { createMemory, queryMemory } = require('../service/vector.service');
const { text } = require('express')


async function serverSocket(httpServer) {
    
    const io = new Server(httpServer, { /* options */ });


    io.use(async(socket,next)=>{

         const cookies = cookie.parse(socket.handshake.headers?.cookie|| "");

        //   console.log(cookies.token)
         if(!cookies.token){
             next(new Error("New Authentication error : no token provided"))
         }

         try{

             const decode =  jwt.verify(cookies.token,process.env.JWT_SECRET_KEY)
            //  console.log(decode)
             const user = await userAuthModel.findById(decode.id) 
            //  console.log(user)

             socket.user = user

             next()

         }catch(error){
             next(new Error("New Authentication error : no token provided"))

         }


    })

    io.on("connection", (socket) => {

        //  console.log("new connection ",socket.id)

        socket.on('ai-message',async(messagePaload)=>{

            //   console.log(messagePaload) 
          
            /**  
    
        const d34msgDb = await msdModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:messagePaload.content,
                role:'user'
            })

     const vectorData = await generVector(messagePaload.content)
            //  console.log(vectorData)

*/
             const [d34msgDb,vectorData] = await Promise.all([
                 msdModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:messagePaload.content,
                role:'user'
            }) ,
            generVector(messagePaload.content)
             ]) 
            await createMemory({
                vector:vectorData,
                messageId:d34msgDb._id,
                metadata:{
                    user:socket.user._id,
                    chat:messagePaload.chat,
                    text:messagePaload.content
                }
            })

            /*  

            const chatHistory = (await msdModel.find({
                chat:messagePaload.chat,
            }).sort({createAt:-1}).limit(5).lean()).reverse()

            const memory = await queryMemory({
                queryVector:vectorData,
                limit:5,
                metadata:{}
            })
             */
            const [chatHistory ,memory] = await Promise.all([
                 msdModel.find({
                    chat:messagePaload.chat
                }).sort({ createdAt: -1 }).limit(20).lean().then(messages => messages.reverse()),

                queryMemory({
                queryVector:vectorData,
                limit:5,
                metadata:{
                     user:socket.user._id
                }
            })


            ])


        const stm =  chatHistory.map(item=>{
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

            const response = await generateResponse([...ltm,...stm])
            //   const response = await generateResponse(messagePaload.content)

            
           /*

            const d34airesponsdb = await msdModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:response,
                role:'model',

            })
            const responseVector = await generVector(response)

              console.log(responseVector)

       */
            socket.emit('ai-response',{
                    chat:messagePaload.chat,
                    response:response
                
            })

            const [d34airesponsdb,responseVector] = await Promise.all([
                msdModel.create({
                user:socket.user._id,
                chat:messagePaload.chat,
                content:response,
                role:'model',

            }),
            generVector(response)
            ])

            await createMemory({
                vector:responseVector,
                messageId:d34airesponsdb._id,
                metadata:{
                    user:socket.user._id,
                    chat:messagePaload.chat,
                    text:response
                }
            })



        })

        

    });


}


module.exports = {serverSocket}
