const express = require("express");
const InquiryController = require("../controllers/inquiryController");

const InquiryRouter = express.Router();

//get all inquiries
InquiryRouter.get("/", InquiryController.getAllInquiries);
//get inquiry by id
InquiryRouter.get("/", InquiryController.getInquiryById);
//create inquiry
InquiryRouter.post("/", InquiryController.createInquiry);
//update inquiry
InquiryRouter.put("/", InquiryController.updateInquiry);
//delete inquiry
InquiryRouter.delete("/", InquiryController.deleteInquiry);

module.exports = InquiryRouter;
