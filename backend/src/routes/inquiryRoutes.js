const express = require("express");
const InquiryController = require("../controllers/inquiryController");
const { verifyAccessToken } = require("./verify");



const InquiryRouter = express.Router();

//get all inquiries
InquiryRouter.get("/",verifyAccessToken, InquiryController.getAllInquiries);
//get inquiry by id
InquiryRouter.get("/", verifyAccessToken, InquiryController.getInquiryById);
//create inquiry 
InquiryRouter.post("/",  verifyAccessToken, InquiryController.createInquiry);
//update inquiry
InquiryRouter.put("/",  verifyAccessToken, InquiryController.updateInquiry);
//delete inquiry
InquiryRouter.delete("/",  verifyAccessToken, InquiryController.deleteInquiry);

module.exports = InquiryRouter;
