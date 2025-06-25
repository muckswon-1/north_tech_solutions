'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserInquiryDraft extends Model {
        static associate(models) {
            // define association here
          }
   
    }

    UserInquiryDraft.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false

        }
        ,
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    },
     {
        sequelize,
        modelName: 'UserInquiryDraft', 
        tableName: 'UserInquiryDrafts', 
    
    });
    UserInquiryDraft.associate = models => {
        UserInquiryDraft.belongsTo(models.User, {foreignKey: 'userId'});
        UserInquiryDraft.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });
    }
        
 return UserInquiryDraft;
}
