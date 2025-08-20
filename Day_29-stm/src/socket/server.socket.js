
const {Server} = require('socket.io')


async function socketServer(httpServer) {
    
    
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  
    console.log("New connection ",socket.id)
});
}


module.exports = socketServer