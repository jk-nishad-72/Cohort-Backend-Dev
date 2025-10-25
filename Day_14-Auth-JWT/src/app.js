
const express = require('express')
// const { model } = require('mongoose')
const userauthRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const app = express()

app.use(express.json())
app.use(cookieParser());

app.use('/auth',userauthRouter) 

// app.get('/' ,(req,res)=>{
//      res.json({
//         Message:" Welcome to server 🙏 "
//      })
// })





module.exports = app