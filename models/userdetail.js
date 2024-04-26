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
      UserDetail.belongsTo(models.User)
    }

    get age(){
      const currentYear = new Date().getFullYear();
      const userYear = this.birthday.getFullYear();
      return currentYear - userYear;
    }
  }
  UserDetail.init({
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: 'birthday cannot be empty'},
        notEmpty: {msg: 'birthday cannot be empty'},
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'gender cannot be empty'},
        notEmpty: {msg: 'gender cannot be empty'},
      }
    },
    bio: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};