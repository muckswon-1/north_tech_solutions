
const Inquiry = require("../models");


const InquiryController = {
  getAllInquiries: async (req, res) => {
    try {
      const inquiries = await Inquiry.findAll();
      res.json(inquiries);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getInquiryById: async (req, res) => {
    try {
      const inquiry = await Inquiry.findByPk();
      res.json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  createInquiry: async (req, res) => {
    try {
      const { userInfo, productsInfo } = req.body;

      const inquiry = await Inquiry.create(userInfo); //To handle productsInfo realations
      res.status(201).json(inquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteInquiry: async (req, res) => {
    try {
      const deleted = await Inquiry.destroy({where : {id:req.params.id}});

      if(!deleted){
        return res.status(404).json({message: 'Inquiry not found'})
      }
      res.json({message: 'Inquiry deleted'});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  updateInquiry: async (req, res) => {
    try {
      const {id, inquiry} = req.body;

      const [updated] = await Inquiry.update(inquiry,{
        where : {id},
        returning: true
      });

      if(!updated){
        return res.status(404).json({message: 'Inquiry not found'})
      }

      const updatedInquiry = await Inquiry.findByPk(id);
     
      res.json(updatedInquiry);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = InquiryController;
