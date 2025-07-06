  /**  Creating a simple http module server  */   

// const http = require('http')


//  const server = http.createServer((req,res)=>{
//          res.end("These is server ");

//  });


//  server.listen(3000,()=>{

//      console.log("Server is Running on Port http://localhost:3000")

//  })



 const express = require("express")


 const app = express()


 app.get('/',(req,res)=>{

   res.send("Server Home page ")

 })
 
 app.get('/about',(req,res)=>{

   res.send("Server About  page ")

 })

 app.get("/profile",(req,res)=>{


  res.send("Profile Page ")
 })

 // This is Nested Routing 
 
app.get("/about/name",(req,res)=>{

   res.send("THe name page ")

})


 app.listen(3000,()=>{

  console.log("Express Server is Running at Port http://localhost:3000")

 })



