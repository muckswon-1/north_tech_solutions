const express = require('express');
const { verifyAccessToken } = require('./verify');
const CompanyController = require('../controllers/companyController');
const checkRole = require('../middleware/checkRole');

const CompanyRouter = express.Router();

CompanyRouter.get('/:userId',verifyAccessToken,checkRole(['admin','user']),CompanyController.getMyCompany)
CompanyRouter.post('/create/:userId',verifyAccessToken,checkRole(['admin','user']), CompanyController.createCompany);
CompanyRouter.patch('/update/:userId',verifyAccessToken,checkRole(['admin','user']), CompanyController.updateCompany);


module.exports = CompanyRouter;