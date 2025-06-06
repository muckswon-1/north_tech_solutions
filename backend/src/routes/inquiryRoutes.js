const express = require("express");
const InquiryController = require("../controllers/inquiryController");
const verifyToken = require("./verify");

const InquiryRouter = express.Router();

//get all inquiries
InquiryRouter.get("/", verifyToken, InquiryController.getAllInquiries);
//get inquiry by id
InquiryRouter.get("/", verifyToken, InquiryController.getInquiryById);
//create inquiry
InquiryRouter.post("/", verifyToken, InquiryController.createInquiry);
//update inquiry
InquiryRouter.put("/", verifyToken, InquiryController.updateInquiry);
//delete inquiry
InquiryRouter.delete("/", verifyToken, InquiryController.deleteInquiry);

module.exports = InquiryRouter;
