const { Sequelize, DataTypes } = require("sequelize");

// module.exports = (
//     sequelize,
// DataTypes

// ) => {
const sequelize = new Sequelize()

const User = sequelize.define(
  "User",
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {}
);

User.associate = function (models) {
  // associations can be defined here
};

//   return User;
// };

module.exports = User;
