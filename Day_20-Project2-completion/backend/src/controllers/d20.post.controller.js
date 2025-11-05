
const generateCaption  = require('../services/d20.ai.service')
const d20pracPostModel = require('../models/d20.post.model')
const {v4:uuidv4}  = require('uuid') 
const uploadImageInImagekit  = require('../services/d20.storage.service')


async function postController(req,res) {

    const file = req.file


     const base64Imagefile = new Buffer.from(file.buffer).toString('base64') 

     const  caption = await generateCaption(base64Imagefile)  

      // const result = await uploadImageInImagekit(file.buffer,`${uuidv4()}`) 

    // console.log(file); 
    // res.send(file)
 
     console.log(caption )
  
    //  const result = await generateCaption(base64Imagefile,`${uuidv4()}`) 

    

    res.status(200).json({
      Msg:caption
    })
    
}

module.exports = {postController, }