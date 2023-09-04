'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertyfacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      propertyfacility.belongsTo(models.property, {
        foreignKey: 'propertyId'
      });

      propertyfacility.belongsTo(models.facility, {
        foreignKey: 'facilityId'
      });
    }
  }
  propertyfacility.init({
    propertyId: DataTypes.INTEGER,
    facilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'propertyfacility',
  });
  return propertyfacility;
};