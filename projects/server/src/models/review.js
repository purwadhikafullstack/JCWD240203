'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.user, {
        foreignKey: 'userId'
      });

      review.belongsTo(models.property, {
        foreignKey: 'propertyId'
      });
    }
  }
  review.init({
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};