const { clear } = require('winston');
const {UserInquiryDraft, Product} = require('../models');
const { get } = require('../routes/inquiryRoutes');

module.exports = {
    getUserDraftInquiries: async (req, res) => {
        try {
            const {userId} = req.params;
            const inquiries = await UserInquiryDraft.findAll({
                where: {userId},
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['name', 'imageUrl', 'price']
                        
                    }
                ]
                

            });
            res.json(inquiries);
        } catch (err) {
            console.log(err);
            throw err;
        }
    
    },
    getUserDraftInquiry: async (req, res) => {
        try {
            const { inquiryDraftId, userId} = req.params;
            const inquiry = await UserInquiryDraft.findOne({where: {userId, id:inquiryDraftId}});

            res.json(inquiry);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUserDraftInquiry: async (req, res) => {
        try {
            const {userId} = req.params;
             
            const inquiry = await UserInquiryDraft.create({userId, ...req.body});
             res.json(inquiry);
    
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    updateDraftQuantity: async (req, res) => {
        try {
            const {inquiryDraftId, userId} = req.params;
            const {quantity} = req?.body;

            
          const inquiry = await UserInquiryDraft.update({quantity}, {where: {userId, id: inquiryDraftId}});
             
             
            res.json(inquiry);
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    deleteDraftInquiryById: async (req, res) => {
        try {
            const {userId, inquiryDraftId} = req.params;
            const inquiry = await UserInquiryDraft.destroy({
                where: {userId, id: inquiryDraftId},
                returning: true,
                attributes: ['id','userId']
            });
            if(inquiry === 1){
                res.json({userId, inquiryDraftId});
            }
         
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    clearUserDraftInquiries: async (req, res) => {
        try {
            const {userId} = req.params;
           await UserInquiryDraft.destroy({where: {userId}});
            res.json(true);
        }catch(err){
            console.log(err);
            throw err;
        }
    }


}