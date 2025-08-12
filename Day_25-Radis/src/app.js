const express = require('express')
const routes = require('./routes/index.routes')
require('dotenv').config()
const authRouter = require('./routes/auth.routes')
const app = express()


app.use(express.static('public/styles'));
app.use(express.static('public/script'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.json());
app.use('/',routes)
app.use('/auth',authRouter)


module.exports = app

