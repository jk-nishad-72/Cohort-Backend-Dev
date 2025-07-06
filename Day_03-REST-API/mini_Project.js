
  const express = require('express')


  const app = express();

   // this is a API  it use .get() method API 

    
  app.get('/',(req,res)=>{
    
      res.send("Server Home Page")
  })
   app.get('/profile',(req,res)=>{
     
    res.send('Profile Page')

   })

   // Now we create a notes featur
   // Creat a notes  -> we need to use POST() method 
   // for sending data frontend to backend 

    app.use(express.json())

    let notes =[];
   app.post('/notes',(req,res)=>{
     
    // express can not read this data defualtelly isliye hum middleware ka use karthe hai "app.use(express.json())" 
       console.log(  req.body)
       notes.push(req.body)
       res.json({
         messege:"Notes Added Succesfully🎉🎉",
         Notes:notes

       })
   })



   
  app.listen(4000,()=>{

     
    console.log("Server runnig at Port http://localhost:4000")

  })
