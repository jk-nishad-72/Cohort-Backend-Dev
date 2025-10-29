

const express = require('express')
const app = express()
require('dotenv').config();
const authRouter = require('./src/routes/d17prcAuth.routes')


app.use(express.json()) 
app.use('/api/auth',authRouter)

module.exports = app