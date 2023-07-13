'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertyImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      propertyImages.belongsTo(models.property, {
        foreignKey: 'propertyId'
      })
    }
  }
  propertyImages.init({
    url: DataTypes.STRING,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'propertyImages',
  });
  return propertyImages;
};