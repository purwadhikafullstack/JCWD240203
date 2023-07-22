'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.room, {
        foreignKey: 'roomId'
      });

      transaction.belongsTo(models.user, {
        foreignKey: 'userId'
      });

      transaction.belongsTo(models.property, {
        foreignKey: 'propertyId'
      });
    }
  }
  transaction.init({
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    status: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};