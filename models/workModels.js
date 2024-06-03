const { DataTypes } = require("sequelize");
const sequelizeDB = require("../configs/database");
const database = require("../configs/database");
const sequelize = require("../configs/database");

// module.exports = (
//     sequelize,
// DataTypes

// ) => {

const Work = sequelize.define(
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
    
  },
  {}
);

Work.associate = function (models) {
  // associations can be defined here
};

//   return Work;
// };

module.exports = Work;
