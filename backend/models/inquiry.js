'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inquiry.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    message: DataTypes.STRING,
    companyId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Inquiry',
    tableName: 'Inquiries'
  });
  Inquiry.associate = models => {
    Inquiry.belongsTo(models.Company, {foreignKey: 'companyId'});
    Inquiry.hasMany(models.ProductInquiry, {foreignKey: 'inquiryId'});
  }
  return Inquiry;
};