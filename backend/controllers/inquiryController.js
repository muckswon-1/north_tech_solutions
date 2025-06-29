
const {Inquiry, Company, sequelize, ProductInquiry, UserInquiryDraft} = require("../models");


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
   

    /**
     * GET THE COMPANY 
     */
    const {userId} = req.params;
    const inquiryInfo = req.body;
    const transaction = await sequelize.transaction();

   
    
    
    const company = await Company.findOne({where: {userId}});
    if(!company) {
      res.status(400).json({message: 'Company not found'});
    }

     const newInquiry = await Inquiry.create(
      {
      message: inquiryInfo.message,
      companyId: company.id
     },
     {transaction}
    ); 

    const  inquiryDrafts = inquiryInfo?.inquiryDrafts

    const productInquiries = inquiryDrafts.map((draft) => {
      return {
        productId: draft.productId,
        quantity: draft.quantity,
        inquiryId: newInquiry.id
      }
    
    });

    await ProductInquiry.bulkCreate(productInquiries, {transaction});

    await transaction.commit();

    await UserInquiryDraft.destroy({where: {userId}});

      res.status(201).json({
        inquiry: newInquiry,
        productInquiries,
        message: 'Inquiry created successfully'
      });
      
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
