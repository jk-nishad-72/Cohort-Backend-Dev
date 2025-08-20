
const express = require('express');
require('dotenv').config();
const userAuthRouter = require('./routes/userAuth.route'); 
const chatRouter = require('./routes/chats.route') ;

const  cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',userAuthRouter);
app.use('/api/chats',chatRouter)

module.exports = app;