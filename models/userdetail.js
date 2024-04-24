'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserDetail.init({
    fullName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};