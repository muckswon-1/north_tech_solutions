'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      // User ͍ Company
      await queryInterface.addConstraint('Users', {
        fields: ['companyId'],
        type: 'foreign key',
        name: 'fk_users_companies',
        references: {
          table: 'Companies',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
  
      });

      await queryInterface.addConstraint('Companies', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_companies_user',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
  
      });

      await queryInterface.addConstraint('Inquiries',{
        fields: ['companyId'],
        type: 'foreign key',
        name: 'fk_inquiries_companies',
        references: {
          table: 'Companies',
          field: 'id'
        }
      });

      await queryInterface.addConstraint('ProductInquiries',{
        fields: ['productId'],
        type: 'foreign key',
        name: 'fk_product_inquiries_products',
        references: {
          table: 'Products',
          field: 'id'
        }
      });

      await queryInterface.addConstraint('Products',{
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_products_users',
        references: {
          table: 'Users',
          field: 'id'
        }
      });
      await queryInterface.addConstraint('ProductInquiries',{
        fields: ['inquiryId'],
        type: 'foreign key',
        name: 'fk_product_inquiries_inquries',
        references: {
          table: 'Inquiries',
          field: 'id'
        }
      });

      await queryInterface.addConstraint('UserInquiryDrafts',{
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_user_inquiry_drafts_users',
        references: {
          table: 'Users',
          field: 'id'
        }
      
      })

      await queryInterface.addConstraint('UserInquiryDrafts',{
        fields: ['productId'],
        type: 'foreign key',
        name: 'fk_user_inquiry_drafts_products',
        references: {
          table: 'Products',
          field: 'id'
        }
      });


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
