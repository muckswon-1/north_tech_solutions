const express = require('express');
const { getUserDraftInquiries, getUserDraftInquiry, createUserDraftInquiry, updateDraftQuantity, deleteDraftInquiryById, clearUserDraftInquiries } = require('../controllers/userInquiryDraftsController');
const { verifyAccessToken } = require('./verify');
const checkRole = require('../middleware/checkRole');
const UserDraftInquiryRouter = express.Router();

UserDraftInquiryRouter.get('/:userId',verifyAccessToken,checkRole(['user', 'admin']),getUserDraftInquiries);
UserDraftInquiryRouter.get('/:userId/:inquiryDraftid',verifyAccessToken,checkRole(['user', 'admin']),getUserDraftInquiry);
UserDraftInquiryRouter.post('/:userId',verifyAccessToken,checkRole(['user', 'admin']),createUserDraftInquiry);
UserDraftInquiryRouter.patch('/:userId/:inquiryDraftId',verifyAccessToken,checkRole(['user', 'admin']),updateDraftQuantity);
UserDraftInquiryRouter.delete('/:userId/:inquiryDraftId',verifyAccessToken,checkRole(['user', 'admin']),deleteDraftInquiryById);
UserDraftInquiryRouter.delete('/:userId',verifyAccessToken,checkRole(['user', 'admin']),clearUserDraftInquiries);


module.exports = UserDraftInquiryRouter;