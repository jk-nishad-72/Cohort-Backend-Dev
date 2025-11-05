const ImageKit = require('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources/index.js');



const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_URL,
    privateKey : process.env.IMAGEKIT_PRIVATE_URL,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadImageInImagekit(file,filename) {

      const response  = await imagekit.upload({
        file:file,
        filename:filename,
        folders:'akjdfksj'
      })

    return response

    
}

module.exports = uploadImageInImagekit
