const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database");
const Image = require("./imageModels");

const workModel = sequelize.define(
  "work",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      field: "end_date",
    },

    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    imageId: { type: DataTypes.STRING, field: "image_id" },
  },
  {}
);

workModel.belongsTo(Image, { foreignKey: "image_id", as: "imageData" });
Image.hasMany(workModel, { foreignKey: "image_id" });

module.exports = workModel;
