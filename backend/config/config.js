const envFile = require('../envConfig');
require("dotenv").config({ path: envFile });

module.exports = {
  development: {
    username: 'sokoni_admin',
    password: 'J0YBXsr6EyzXcxG',
    database: 'sokoni',
    host: 'localhost',
    port: '5432',
    logging : true,
    define: {
      underscored: false,
      timestamps: true
    },
    dialect: "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

