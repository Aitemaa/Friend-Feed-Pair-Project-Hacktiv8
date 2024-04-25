'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Username cannot be empty'},
        notEmpty: {msg: 'Username cannot be empty'},
        len: {
          args: [5,10],
          msg: 'Username length must be between 5 and 10'
        },
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Email cannot be empty'},
        notEmpty: {msg: 'Email cannot be empty'},
        isEmail: {msg: 'Email form must be filled in Email format'},
        async isUnique(value){
          const existingUser = await User.findOne({ where: { email: value } });
        if (existingUser){
          throw new Error('Email already exists')
          }
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password cannot be empty'},
        notEmpty: {msg: 'Password cannot be empty'},
        len: {
          args: [8],
          msg: 'Password length must be more than 8'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
      }
    }
  });
  return User;
};