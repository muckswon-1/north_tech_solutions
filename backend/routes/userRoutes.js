const express = require('express');
const checkRole = require('../middleware/checkRole');
const { verifyAccessToken } = require('./verify');
const UserController = require('../controllers/userController');

const UserRouter = express.Router();

UserRouter.get('/',verifyAccessToken, checkRole(['admin']), UserController.getAllUsers);
UserRouter.get('/:id',verifyAccessToken, checkRole(['admin','user']),UserController.getUserById);
UserRouter.post('/', verifyAccessToken, checkRole(['admin']),UserController.createUser);
UserRouter.patch('/:id', verifyAccessToken, checkRole(['admin','user']), UserController.updateUser);
UserRouter.patch('/:id/admin-reset-password', verifyAccessToken, checkRole(['admin']),UserController.resetUserPassword);
UserRouter.delete('/:id',verifyAccessToken, checkRole(['admin']), UserController.deleteUser);

module.exports = UserRouter;