
const d19PrcPostModel  = require('../models/d19post.model') 
const generateAiCaption  = require('../services/ai.service')
const uploadImageInImagekit = require('../services/storage.service') 
const { v4:uuidv4}  = require('uuid')




async function postController(req,res) {

    const file = req.file 


     const base64ImageFile  = new Buffer.from(file.buffer).toString('base64')

    //  console.log(base64ImageFile);

     const caption = await generateAiCaption(base64ImageFile)


     const resultOfImagekit = await uploadImageInImagekit(file.buffer,`${uuidv4()}`)


     const postCreated = await d19PrcPostModel.create({
        image:resultOfImagekit.url,
        caption,caption,
        
     })
     
    console.log(caption)  

    res.status(201).json({
        Messge:'Post Created successfully ',
        NewPost:postCreated
    })
    
}

module.exports = { postController,}