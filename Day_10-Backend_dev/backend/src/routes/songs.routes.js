



const express = require("express")

const multer = require('multer')
const uploadFile = require('../service/storage.service')
const router  = express.Router();
const songModel = require('../models/songs.model') 
const upload = multer({storage:multer.memoryStorage()});

/*
frontend se chahiye ye sab 

 tittle
 artist
 audio 
*/ 

router.get('/',upload.single("audio"),(req,res)=>{

    res.json({

        Message:"Welcome in Server"
    })

})
router.post('/songs',upload.single("audio"),async(req,res)=>{

 
   const fileData = await uploadFile(req.file)
     console.log( req.body)
   console.log(req.file)
  console.log(fileData)

  const song = await songModel.create({
    
    tittle:req.body.tittle,
    artist:req.body.artist,
    audio:fileData.url,
    mood:req.body.mood
  })

  res.status(201).json({
     message:"song created",
     song:song

  })

})

router.get('/songs',async(req,res)=>{

   const {mood} = req.query;

   const songs = await songModel.find({
    mood:mood
   })

   res.status(200).json({
    Message:"songs fetched sucessfully🎉",
    songs:songs
   })


})

module.exports = router