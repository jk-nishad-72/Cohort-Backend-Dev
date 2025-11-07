
const app = require('./app')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


//* go to postman  select web socket and enter ws://localhost:3000  then click on connect
io.on("connection", (socket) => {
  // ...
    console.log("A user connected");


});

httpServer.listen(3000); 

// app.use((req, res) => {
//     res.status(200).send("Hello World!");
// });




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});