const Imagekit = require("imagekit");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadImageInImagekit(fileBuffer, fileName) {
  try {
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: "d20project/images",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = uploadImageInImagekit;
