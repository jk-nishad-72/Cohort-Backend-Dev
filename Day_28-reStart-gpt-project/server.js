
const app = require('./src/app');
const express = require('express')
const connectTodb= require('./src/DB/db')
const initSocketServer = require('./src/sockets/server.socket');

const httpServer = require('http').createServer(app);

connectTodb();
initSocketServer(httpServer);

httpServer.listen(3000,()=>{
    console.log('Server is running on port 3000');
})