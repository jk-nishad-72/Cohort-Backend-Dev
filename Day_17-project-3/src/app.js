
const express = require("express")

require('dotenv').config()

const authRouter = require('./routes/auth.route')

const app = express()

app.use(express.json())
app.use('/auth',authRouter)



module.exports = app