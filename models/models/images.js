"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    static associate(models) {
      this.belongsTo(models.works, {
        foreignKey: "workId",
        as: "work",
      });
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
