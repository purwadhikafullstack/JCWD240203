'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertyFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      propertyFacility.belongsTo(models.property, {
        foreignKey: 'propertyId'
      });

      propertyFacility.hasOne(models.facility, {
        foreignKey: 'facilityId'
      });
    }
  }
  propertyFacility.init({
    propertyId: DataTypes.INTEGER,
    facilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'propertyFacility',
  });
  return propertyFacility;
};