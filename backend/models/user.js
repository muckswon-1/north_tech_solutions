'use strict';
const { Model } = require('sequelize');



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
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.UUID,
    emailVerificationCode:{
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerificationCodeExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  User.associate = models => {
    User.belongsTo(models.Company, {foreignKey: 'companyId'});
    User.hasOne(models.Company, {foreignKey: 'userId'})
  }
  return User;
};