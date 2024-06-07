"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class works extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log("models", models);
      works.hasMany(models.images, { as: "imageData", foreignKey: "workId" });
    }
  }
  works.init(
    {
      name: { type: DataTypes.STRING },
      description: DataTypes.STRING,
      startDate: { type: DataTypes.DATE, field: "start_date" },
      endDate: { type: DataTypes.DATE, field: "end_date" },
      imageId: { type: DataTypes.STRING, field: "image_id" },

      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      modelName: "works",
    }
  );
  return works;
};
