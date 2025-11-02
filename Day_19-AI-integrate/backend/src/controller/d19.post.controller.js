
const d19PrcPostModel  = require('../models/d19post.model') 
const generateAiCaption  = require('../services/ai.service')

const { v4:uuidv4}  = require('uuid')




async function postController(req,res) {

    const file = req.file 


     const base64ImageFile  = new Buffer.from(file.buffer).toString('base64')

     console.log(base64ImageFile);

    //  const caption = await generateAiCaption(base64ImageFile)
     

    // console.log(file)  

    res.json({
        Messge:file
    })
    
}

module.exports = { postController,}