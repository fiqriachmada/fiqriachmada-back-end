const ImageKit = require("imagekit");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const imageKitConfig = config[env];

var imageKitApi = new ImageKit({
  publicKey: imageKitConfig.imageKitPublicKey,
  privateKey: imageKitConfig.imageKitPrivateKey,
  urlEndpoint: imageKitConfig.imageKitUrl,
});

console.log("imageKitApi", imageKitApi);

module.exports = imageKitApi;
