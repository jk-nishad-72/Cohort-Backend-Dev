
const postModel = require('../models/post.model')
const generateCaption  = require('../service/ai.service')



async function createPostController(req,res){
     const file = req.file;


     console.log(file);  
     

}



module.exports ={ createPostController}