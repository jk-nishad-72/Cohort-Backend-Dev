const express = require('express')
const routes = require('./routes/index.routes')
require('dotenv').config()
const authRouter = require('./routes/auth.routes')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.static('public/styles'));
app.use(express.static('public/script'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.set("view engine", "ejs");
// app.set("views", "src/views");
app.use(express.json());
app.use('/',routes)
app.use('/auth',authRouter)


module.exports = app

