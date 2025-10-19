
const express = require('express')
const app = express();
const authRouter = require('./src/routes/auth.route')
require('dotenv').config();



app.use(express.json())
app.use('/api/auth',authRouter)

module.exports = app