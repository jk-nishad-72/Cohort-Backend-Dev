const  express = require('express')
const router = require('./routes/auth.routes')
const app = express()

require('dotenv').config()



app.use(express.json())
app.use('/auth',router)

module.exports =app