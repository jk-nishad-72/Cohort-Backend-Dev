
// import ImageKit from "imagekit";

// or
var ImageKit = require("imagekit");
const { model } = require("mongoose");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_URL,
    privateKey : process.env.IMAGEKIT_PRIVATE_URL,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

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
