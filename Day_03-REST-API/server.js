

const e = require('express');
const express = require('express')

const app = express();

  
app.get('/',(req,res)=>{

     res.send("Server HOme page")

})

app.get('/about',(req,res)=>{
     res.send(" About page ");
})

app.get('/profile',(req,res)=>{
    res.send("Profil page")
})
app.get('/contact',(req,res)=>{

     res.send("contact Page")

})

 // Project -01 of Backend   
 // Create Notes 
 // show all notes

 /**note with  Heading_ and description */

  app.use('/notes',(req,res)=>{
      console.log(notes)
  })
  const notes = [];

  app.post('/notes',(req,res)=>{
      
     notes.push(req.body)
      res.send(notes)

      
  })


 
app.listen(3000,()=>{

     console.log("Server Runnig at Port http://localhost:3000")

})