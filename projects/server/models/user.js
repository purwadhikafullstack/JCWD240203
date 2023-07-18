'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.property, {
        foreignKey: 'userId'
      });

      user.hasMany(models.review, {
        foreignKey: 'userId'
      });
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    desc: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    profilePicture: DataTypes.STRING,
    idCard: DataTypes.STRING,
    code: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};