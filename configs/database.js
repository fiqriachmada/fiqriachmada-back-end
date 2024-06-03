const { Sequelize } = require("sequelize");
const config = require("./config");

// const config = require("./config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

console.log('dbConfig', dbConfig)

const sequelize = new Sequelize(
  dbConfig.url,
  // dbConfig.username,
  // dbConfig.password,
  {
    // host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
