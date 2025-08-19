
const express = require('express');
require('dotenv').config();
const userAuthRouter = require('./routes/userAuth.route');  
const  cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',userAuthRouter);


module.exports = app;