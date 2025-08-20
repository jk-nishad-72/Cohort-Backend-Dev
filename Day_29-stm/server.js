
const app = require('./src/app');
const connectDB = require('./src/DB/db');
const initSocketServer = require('./src/socket/server.socket')

const httpServer = require('http').createServer(app)


connectDB();
initSocketServer(httpServer)


httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
}   );

