const db = require("../models");

exports.loadDatabase =  async () => {
   
        try {
          await db.sequelize.authenticate();
          console.log('⬇️ ⬇️ ⬇️ Database connection has been established successfully')
          
        } catch (error) {
          throw error
        }
 }
