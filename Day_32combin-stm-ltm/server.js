

const app = require('./src/app')
const connecTodb = require('./src/DB/db');
const serverSocket = require('./src/sockets/server.socket')


const httpServer = require('http').createServer(app)


//* database connection 

connecTodb()
serverSocket(httpServer)

httpServer.listen(3000,()=>{
    console.log("Server running on port 3000")
})

