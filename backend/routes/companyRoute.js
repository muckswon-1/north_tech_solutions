const express = require('express');
const { verifyAccessToken } = require('./verify');
const CompanyController = require('../controllers/companyController');

const CompanyRouter = express.Router();

CompanyRouter.get('/',verifyAccessToken,CompanyController.getMyCompany);
CompanyRouter.post('/create',verifyAccessToken, CompanyController.createCompany);
CompanyRouter.patch('/update',verifyAccessToken, CompanyController.updateCompany);


module.exports = CompanyRouter;