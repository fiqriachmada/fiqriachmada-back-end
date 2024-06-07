const fs = require("fs");
const dotenv = require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    dialect: "mysql",
    imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    imageKitUrl: process.env.IMAGEKIT_URL,
    ssl: {
      // ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),

      require: true,
      rejectUnauthorized: false,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    dialect: "mysql",
    imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    imageKitUrl: process.env.IMAGEKIT_URL,
    ssl: {
      // ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),

      require: true,
      rejectUnauthorized: false,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    dialect: "mysql",

    imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    imageKitUrl: process.env.IMAGEKIT_URL,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: true,
      },
    },
  },
};
