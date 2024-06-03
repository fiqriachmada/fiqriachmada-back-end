module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
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
  },
};
