
const songD9PrcModel = require('../models/songs.model')
const express  = require('express')
const songRouter  = express.Router()
const multer = require('multer')
const unploadSongFile = require('../service/storage.service')

const upload = multer({storage:multer.memoryStorage()})




songRouter.get('/',(req,res)=>{
     res.send({
        message: " Welcome to moody server 🙏 ",
        say:"hello User 👋" 
     })
})


songRouter.post('/songs', upload.single("audio"),async(req,res)=>{


      // console.log(req.body)
      // console.log(req.file)


      const songFileData = await unploadSongFile(req.file)

      //  console.log(songFileData.url); 
       

      const songDbData = await songD9PrcModel.create({
            SongName:req.body.tittle,
            ArtistName:req.body.artist,
           audio:songFileData.url,
             mood:req.body.mood
             })
    
      res.status(201).json({
        mesage:"songs sended ☑️",
        song: songDbData,
        // songFile:req.file
      })
     
})
module.exports = songRouter 





