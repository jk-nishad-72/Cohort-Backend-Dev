 

   const express = require('express')

   const app = express();

 app.get('/',(r,rs)=>{
   
   rs.send("Server Home page")



 })

  app.get('/profile',(r,rs)=>{
     rs.send("Profile Page")


  })
  app.get('/about',(r,rs)=>{
     rs.send("About Page ")


  })
  app.get('/contact',(r,rs)=>{
     rs.send("Contact Page ")

  })
   














   app.listen(3000,()=>{

     console.log("Server is ruuning at port 3000")

      
   })