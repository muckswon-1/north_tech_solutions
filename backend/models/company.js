'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    profileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      
    },
    verifiedEmail:{
      type:  DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifiedPhone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Company',
  });

  Company.associate = models => {
    Company.hasMany(models.User, {foreignKey: 'companyId'})
    Company.belongsTo(models.User,{foreignKey: 'userId'});
    Company.hasMany(models.Inquiry, {foreignKey: 'companyId'});

  }
  return Company;
};