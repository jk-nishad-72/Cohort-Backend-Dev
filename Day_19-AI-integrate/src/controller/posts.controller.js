

const captionGenerator = require('../service/ai.service')
const uploadImageInImagekit = require('../service/storage.service')
const { v4: uuidv4 } = require('uuid');
const postModel = require('../models/post.model')


async function postscontroller(req,res) {

      //buffer me file aa rhi hai 
      const file= req.file

 //* need to convert file into base64Imagefile

// console.log(file)

const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

 const caption = await captionGenerator(base64ImageFile)
      
//  console.log(caption)

/*  const caption = await generateCaption(base64Image);
     const result = await uploadFile(file.buffer, `${uuidv4()}`); */
const result = await uploadImageInImagekit(file.buffer,`${uuidv4()}`)

const post = await postModel.create({
        caption: caption,
        image: result.url,
      //   user: req.authentication._id
    })

res.status(201).json({
        message: "Post created successfully",
        post:post
    })
     
    
}

module.exports = {postscontroller}

