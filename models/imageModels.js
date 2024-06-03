// const { DataTypes } = require("sequelize");
// const sequelize = require("./index");
// const Work = require("./Work");

const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database");

const Image = sequelize.define(
  "image",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    url: { type: DataTypes.STRING, field: "image_url" },
    // workId: { type: DataTypes.STRING, field: "work_id" },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {}
);

// Work.hasMany(Image, { foreignKey: "work_id" });
// Image.belongsTo(Work, { foreignKey: "work_id" });

module.exports = Image;
