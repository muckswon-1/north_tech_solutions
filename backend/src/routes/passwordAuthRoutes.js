const express = require('express');
const passwordAuthController = require('../controllers/passwordAuthController');
const verifyToken = require('./verify');


const PasswordAuthRouter = express.Router();

PasswordAuthRouter.post('/sokoni-api/password-auth/register', passwordAuthController.register);
PasswordAuthRouter.post('/sokoni-api/password-auth/login', passwordAuthController.login);
PasswordAuthRouter.get('/sokoni-api/password-auth/logout', passwordAuthController.logout);
PasswordAuthRouter.get('/sokoni-api/password-auth/me',verifyToken, passwordAuthController.getMe);



module.exports = PasswordAuthRouter;