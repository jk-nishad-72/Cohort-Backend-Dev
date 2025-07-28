
const express = require('express')

const app = express()
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');




app.use(express.json())


app.use('/auth',authRoutes)
app.use(cookieParser())





module.exports = app