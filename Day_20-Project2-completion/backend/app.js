
const express = require('express')
const app = express();
require('dotenv').config() 
const authRouter = require('./src/routes/d20prcauth.routes')
const cookieParser = require('cookie-parser')
const postRouter = require('./src/routes/d20prcPost.routes')




app.use(express.json())
app.use(cookieParser())

//* Authentication APIs  
app.use('/api/auth',authRouter)


//* Post APIs

app.use('/api/post', postRouter)


module.exports = app