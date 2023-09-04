'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      property.belongsTo(models.category, {
        foreignKey: 'categoryId'
      });
      
      property.belongsTo(models.user, {
        foreignKey: 'userId'
      });

      property.hasMany(models.propertyimages, {
        foreignKey: 'propertyId'
      });

      property.hasMany(models.room, {
        foreignKey: 'propertyId'
      });

      property.hasMany(models.propertyfacility, {
        foreignKey: 'propertyId'
      });

      property.hasMany(models.review, {
        foreignKey: 'propertyId'
      });

      property.hasMany(models.transaction, {
        foreignKey: 'propertyId'
      });
    }
  }
  property.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property',
  });
  return property;
};