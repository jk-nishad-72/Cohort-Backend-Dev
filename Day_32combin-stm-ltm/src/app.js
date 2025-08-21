
const express = require('express')
require('dotenv').config();
const app = express();
const authRouter = require('./routes/d32auth.route')
const chatsRouter = require('./routes/d32chats.route')
const cookieParser = require('cookie-parser');


//* Inbuild  MIDDLEWARE

app.use(express.json())
app.use(cookieParser())


//* routes 
app.use('/api/auth',authRouter)
app.use('/api/chats',chatsRouter)

module.exports = app

