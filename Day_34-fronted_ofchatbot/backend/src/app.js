
const express = require("express");
require('dotenv').config();
const app = express();
const authRouter = require('./routes/d32auth.route')
const chatRouter = require('./routes/d34chats.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')



//* built in  middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
     credentials: true
}))
app.use(express.json())
 app.use(cookieParser())


//* routing

app.use('/api/auth',authRouter)
app.use('/api/chats',chatRouter)




module.exports = app

