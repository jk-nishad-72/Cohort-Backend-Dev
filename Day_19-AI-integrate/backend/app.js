
const  express = require('express')
const app = express()

require('dotenv').config();
const connectedToDB  = require('./src/DB/db')
const authRouter = require('./src/routes/auth.routes') 
const cookieParser = require('cookie-parser')


connectedToDB() 

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRouter)





module.exports = app