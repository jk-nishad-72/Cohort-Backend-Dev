
const express = require('express')

const routes = require('./routes/index.routes')
const app = express()


app.set("view engine", "ejs");
app.use('/',routes)

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


module.exports= app