
const {Company} = require('../models')
const CompanyController = {
    getMyCompany: async (req,res) => {
        try {
            const {userId} = req.params;
            const company = await Company.findOne({where: {userId}});

            return res.json(company || {})
            
        } catch (error) {
            res.status(500).json({message: 'Server error', error: error.message})
        }
    },
    createCompany: async (req,res) => {
        try {
            const {userId} = req.params;

            const existing = await Company.findOne({where: {userId}});

            if(existing) return res.status(400).json({message: 'Company Profile already exists'});

            const company = await Company.create({...req.body, userId});
            res.status(201).json(company);

        } catch (error) {
            res.status(500).json({message: 'Server error', error: error.message})
        }
        
    },
    updateCompany: async (req,res) => {
        try {
           const {userId} = req.params;

             const existing = await Company.findOne({where: {userId}});
            


             if(!existing) return res.status(404).json({message: 'Company profile not found.'});

            const response =  await Company.update(req.body,
                {
                    where: {userId},
                    returning: true
                }
            );

            console.log(response);
           
            res.json(response);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error', error: error.message})
        }
    }
}

module.exports = CompanyController;