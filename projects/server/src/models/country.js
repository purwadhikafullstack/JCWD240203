'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      country.hasMany(models.city, {
        foreignKey: 'countryCode',
        sourceKey: 'countryCode'
      });
    }
  }
  country.init({
    name: DataTypes.STRING,
    countryCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};