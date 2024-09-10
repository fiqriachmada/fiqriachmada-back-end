"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const process = require("process");
const works = require("./models/works");
const images = require("./models/images");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../configs/config.js')[env];

// const config = ;
const dotenv = require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require("./../configs/config")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

fs.readdirSync(__dirname + "/models/")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const modelName = file.replace(".js", ""); // Mendapatkan nama model dari nama file
    const model = require(path.join(__dirname + "/models/", file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[modelName] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('db.works', db.works)

module.exports = db;
