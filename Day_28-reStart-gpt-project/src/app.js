
const express = require('express')
require('dotenv').config();
const authRoutes = require('./routes/auth.routes')
const app = express()


/** User middleware  */
app.use(express.json());



// * Using Ruites

app.use('/api/auth',authRoutes);




module.exports = app;

