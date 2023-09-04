'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertyimages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      propertyimages.belongsTo(models.property, {
        foreignKey: 'propertyId'
      })
    }
  }
  propertyimages.init({
    url: DataTypes.STRING,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'propertyimages',
  });
  return propertyimages;
};