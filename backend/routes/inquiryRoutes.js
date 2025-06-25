const express = require("express");
const InquiryController = require("../controllers/inquiryController");
const { verifyAccessToken } = require("./verify");
const { check } = require("express-validator");
checkRole = require("../middleware/checkRole");



const InquiryRouter = express.Router();

//get all inquiries
InquiryRouter.get("/",verifyAccessToken, checkRole(['admin']), InquiryController.getAllInquiries); 
//get inquiry by id
InquiryRouter.get("/", verifyAccessToken, InquiryController.getInquiryById);
//create inquiry 
InquiryRouter.post("/:userId",  verifyAccessToken,checkRole(['admin','user']), InquiryController.createInquiry);
//update inquiry
InquiryRouter.put("/",  verifyAccessToken, InquiryController.updateInquiry);
//delete inquiry
InquiryRouter.delete("/",  verifyAccessToken, InquiryController.deleteInquiry);

module.exports = InquiryRouter;
