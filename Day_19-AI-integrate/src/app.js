
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auths.route')
const postsRouter = require('./routes/posts.routes')
const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use()
app.use('/api/auth',authRouter)
app.use('/api/posts',postsRouter)





module.exports= app
