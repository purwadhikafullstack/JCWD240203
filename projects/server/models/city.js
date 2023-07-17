'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      city.belongsTo(models.country, {
        foreignKey: 'countryCode'
      });
    }
  }
  city.init({
    name: DataTypes.STRING,
    countryCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'city',
  });
  return city;
};