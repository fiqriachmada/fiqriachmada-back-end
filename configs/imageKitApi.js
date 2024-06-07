const ImageKit = require("imagekit");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const imageKitConfig = config[env];

// console.log('imageKitConfig', imageKitConfig)

var imageKitApi = new ImageKit({
  publicKey: imageKitConfig.imageKitPublicKey,
  privateKey: imageKitConfig.imageKitPrivateKey,
  urlEndpoint: imageKitConfig.imageKitUrl,
});

module.exports = imageKitApi;
