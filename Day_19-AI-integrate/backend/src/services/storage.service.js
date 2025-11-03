

const Imagekit = require('imagekit') 


const imagekit = new Imagekit({
     publicKey : process.env.IMAGEKIT_PUBLIC_URL,
    privateKey : process.env.IMAGEKIT_PRIVATE_URL,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
})

async function uploadImageInImagekit(file,filename) {

      const response = await imagekit.upload(
        {
            file:file,
            fileName:filename,
            folder:"cohort-ai-social"
        }
    )

     return response
    
}

module.exports = uploadImageInImagekit