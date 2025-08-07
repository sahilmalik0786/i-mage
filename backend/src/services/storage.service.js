const Imagekit = require("imagekit");


const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

async function uploadImg(file) {
  return new Promise((res, rej) => {
    imagekit.upload(
      {
        file: file.buffer.toString('base64'),
        fileName: `caption-${Date.now()}-${'hllleo'}.jpg`,
        folder: "caption_generator",
        useUniqueFileName: false
      },
      (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      }
    );
  });
}

module.exports = uploadImg
