
const app = require('./src/app');
const express = require('express')
const connectTodb= require('./src/DB/db')


connectTodb();




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})