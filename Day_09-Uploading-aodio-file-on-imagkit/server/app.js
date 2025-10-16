
const express = require('express')
const songRouter = require('./src/routes/song.route')
require('dotenv').config()



const app = express()
app.use(express.json())
app.use('/',songRouter)






module.exports = app