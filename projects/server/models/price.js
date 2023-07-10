'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      price.belongsTo(models.room, {
        foreignKey: 'roomId'
      });
    }
  }
  price.init({
    roomId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    duration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'price',
  });
  return price;
};