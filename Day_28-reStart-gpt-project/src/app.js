
const express = require('express')
require('dotenv').config();
const authRoutes = require('./routes/auth.routes')
const chatRouter = require('./routes/chats.routes');
const cookieParser = require('cookie-parser');
const app = express()


/** User middleware  */
app.use(express.json());
app.use(cookieParser());


// * Using Ruites

app.use('/api/auth',authRoutes);
app.use('/api/chats',chatRouter)



module.exports = app;

