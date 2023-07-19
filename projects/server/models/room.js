'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      room.belongsTo(models.property, {
        foreignKey: 'propertyId'
      });

      room.hasMany(models.price, {
        foreignKey: 'roomId'
      });

      room.hasMany(models.transaction, {
        foreignKey: 'roomId'
      });
    }
  }
  room.init({
    propertyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};