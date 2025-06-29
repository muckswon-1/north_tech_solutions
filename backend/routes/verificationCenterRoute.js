const express = require('express');
const { profileVerificationCompleted, verifyEmailCode, verifyPhoneNumberCode, sendPhoneNumberCode, sendEmailCode } = require('../controllers/verificationController');
const { verifyAccessToken } = require('./verify');
const checkRole = require('../middleware/checkRole');
const VerificationCenterRouter = express.Router();


VerificationCenterRouter.post('/:userId/verify-email-code',verifyAccessToken,checkRole(['admin','user']),verifyEmailCode);
VerificationCenterRouter.post('/:userId/send-email-code',verifyAccessToken,checkRole(['admin','user']),sendEmailCode);
VerificationCenterRouter.post('/:userId/verify-phone-number-code',verifyAccessToken,checkRole(['admin','user']),
verifyPhoneNumberCode);
VerificationCenterRouter.post('/:userId/send-phone-number-code',verifyAccessToken,checkRole(['admin','user']),sendPhoneNumberCode);

VerificationCenterRouter.get('/:userId/profile-verification-completed',profileVerificationCompleted);

module.exports = VerificationCenterRouter;