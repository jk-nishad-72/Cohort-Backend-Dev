
const express = require('express')
require('dotenv').config()
const  authRoutes  = require('./routes/auths.routes')
const cookieParser = require("cookie-parser")
const postRoutes = require('../src/routes/post.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
//*instagram post feature ki trh  
app.use('/api/post',postRoutes) 



module.exports = app