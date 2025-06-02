const Inquiry = require("../models/inquiryModel");
const { create, update } = require("../models/productModel");

const InquiryController = {
  getAllInquiries: async (req, res) => {
    try {
      const inquiries = await Inquiry.returnAll();
      res.json(inquiries);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getInquiryById: async (req, res) => {
    try {
      const inquiry = await Inquiry.returnById(req.params.id);
      res.json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  createInquiry: async (req, res) => {
    try {
      const { userInfo, productsInfo } = req.body;

      const inquiry = await Inquiry.create(userInfo, productsInfo);
      res.status(201).json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.delete(req.params.id);
      res.json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  updateInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.update(req.body.id, req.body.inquiry);
      res.json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = InquiryController;
