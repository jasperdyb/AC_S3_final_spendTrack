'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.NUMBER,
    shop: DataTypes.STRING
  }, {});
  Record.associate = function (models) {
    Record.belongsTo(models.User)
  };
  return Record;
};