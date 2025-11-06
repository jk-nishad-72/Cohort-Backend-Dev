
const generateCaption  = require('../services/d20.ai.service')
const d20pracPostModel = require('../models/d20.post.model')
const {v4:uuidv4}  = require('uuid') 
const uploadImageInImagekit  = require('../services/d20.storage.service')


async function postController(req,res) {

    const file = req.file

    //  console.log(req.user); 
     

     const base64Imagefile = new Buffer.from(file.buffer).toString('base64') 

     const  caption = await generateCaption(base64Imagefile)  

     

    // console.log(file); 
    // res.send(file)
 
    //  console.log(caption);
  
     const result = await uploadImageInImagekit(base64Imagefile,`${uuidv4()}`) 
 
      // console.log(result.url);
      
      const newPost = await d20pracPostModel.create({
            image:result.url,
            caption:caption,
            user:req.user._id,
            
          
      })
    

    res.status(201).json({
      Msg:'Post created successfully',
      Post:newPost
    })
    
}

module.exports = {postController, }