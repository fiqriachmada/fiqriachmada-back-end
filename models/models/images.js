"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  images.init(
    {
      workId: { type: DataTypes.STRING, field: "work_id" },
      imageUrl: { type: DataTypes.STRING, field: "image_url" },

      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      modelName: "images",
    }
  );
  return images;
};
