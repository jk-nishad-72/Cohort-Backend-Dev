
const  express = require('express')
const app = express()

require('dotenv').config();
const connectedToDB  = require('./src/DB/db')
const authRouter = require('./src/routes/auth.routes') 

connectedToDB() 

app.use(express.json())


app.use('/api/auth',authRouter)





module.exports = app