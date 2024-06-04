const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database");

const imageModel = sequelize.define(
  "image",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    url: { type: DataTypes.STRING, field: "image_url" },
    workId: { type: DataTypes.STRING, field: "work_id" },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {}
);

// Work.hasMany(imageModel, { foreignKey: "work_id" });
// imageModel.belongsTo(Work, { foreignKey: "work_id" });

module.exports = imageModel;
