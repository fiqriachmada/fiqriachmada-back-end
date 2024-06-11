"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      firstName: { type: DataTypes.STRING, field: "first_name" },
      lastName: { type: DataTypes.STRING, field: "last_name" },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
