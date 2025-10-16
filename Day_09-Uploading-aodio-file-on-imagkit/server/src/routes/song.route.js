
const songD9PrcModel = require('../models/songs.model')
const express  = require('express')
const songRouter  = express.Router()
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})




songRouter.get('/',(req,res)=>{
     res.send({
        message: " Welcome to moody server 🙏 ",
        say:"hello User 👋" 
     })
})


songRouter.post('/songs', upload.single("audio"),(req,res)=>{


      console.log(req.body)
      console.log(req.file)
    
      res.send({
        mesage:"songs sended ☑️",
        song:req.body
      })
     
})



module.exports = songRouter 





