
const {Server} = require('socket.io')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const authModel = require('../models/auth.model');



async function socketServer(httpServer) {
    
    
const io = new Server(httpServer, { /* options */ });



io.use(async (socket,next)=>{

     const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    //   const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
     console.log(cookies.token)

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

io.on("connection", (socket) => {
  
    console.log("New connection ",socket.id)
});
}


module.exports = socketServer