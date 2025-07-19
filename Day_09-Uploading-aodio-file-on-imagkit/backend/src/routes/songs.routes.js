



const express = require("express")

const multer = require('multer')
const uploadFile = require('../service/storage.service')
const router  = express.Router();
const upload = multer({storage:multer.memoryStorage()});

/*
frontend se chahiye ye sab 

 tittle
 artist
 audio 
*/ 

router.get('/songs',upload.single("audio"),(req,res)=>{

    res.json({

        Message:"Welcome in Server 🙏"
    })

})
router.post('/songs',upload.single("audio"),async(req,res)=>{

   console.log( req.body)
   console.log(req.file)
   const fileData = await uploadFile(req.file)
console.log(fileData)

  res.status(201).json({
     message:"song created",
     song:req.body

  })

})

module.exports = router