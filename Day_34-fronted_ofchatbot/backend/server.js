

const app = require('./src/app')
const connectTodb = require('./src/DB/db')

const httpServer = require('http').createServer(app)
const {serverSocket} = require('./src/sockets/server.socket')






connectTodb()
serverSocket(httpServer)


httpServer.listen(3001,()=>{
    console.log("Server running on port 3001")

})


