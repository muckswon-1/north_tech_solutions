const { User } = require('../models');
const passwordGenerator = require('generate-password');
const bcrypt = require('bcrypt');
const { passwordSchema } = require('../utils');


const UserController = {
    getAllUsers: async (req,res) => {
      try {
        
        const users = await User.findAll({
            attributes: {exclude: ['password']}
            
        });

        res.json(users);

      } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
      }
    },

    createUser: async (req,res) => {


      try {
        const {firstName, lastName, email, role} = req.body;

         const existing = await User.findOne({where: {email}});
         console.log('existing',existing);

         const password = passwordGenerator.generate({
          length: 10,
          numbers: true,
          symbols: true,
          lowercase: true,
          uppercase: true,
          exclude: " ",
          strict: true
         })

         console.log(password);

         const hashedPassword = await bcrypt.hash(password, 10)



         if(existing) {
          return res.status(400).json({message: 'User already exists!'});
         }

         const response = await User.create({email, password: hashedPassword, role, firstName,lastName });
          res.json({id: response.id, email: response.email, role: response.role});

        
      } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
      }

    },

    getUserById: async (req,res) => {
        try {
        
            const user = await User.findByPk(req.params.id,{
                attributes: {exclude: ['password']}
            });
            res.json(user);
    
          } catch (error) {
            res.status(500).json({message: 'Server error', error: error.message})
          }
    },
    updateUser: async (req,res) => {
        try {

            const updateFields = req.body;

            const userToUpdate = await User.findByPk(req.params.id);

            if(!userToUpdate) {
                return res.status(404).json({message: 'User not found'})
            }

              await User.update(updateFields,{where: {id: req.params.id}});
              const updatedUser = await User.findByPk(req.params.id);
          
            res.json({
              id: updatedUser.id,
              email: updatedUser.email,
              role: updatedUser.role,
              firstName: updatedUser.firstName ? updatedUser.firstName : null,
              lastName: updatedUser.lastName ? updatedUser.lastName : null
            })
           
        } catch (error) {
            res.status(500).json({message: 'Server error', error: error.message});
        }
    },

    adminResetUserPassword: async (req,res) => {
     
      try {
        const {id} = req.params;

        const userToUpdate = await User.findByPk(id);


        if(!userToUpdate) {
            return res.status(404).json({message: 'User not found'})
        }

      

        const newPassword =   passwordGenerator.generate({
          length: 10,
          numbers: true,
          symbols: true,
          lowercase: true,
          uppercase: true,
          exclude: " ",
          strict: true
         });

         console.log(newPassword);

        

          const hashedPassword = await bcrypt.hash(newPassword, 10);


         const [updatedRows] = await User.update({password : hashedPassword},{where: {id}});
        
         
         if(updatedRows === 0){
          return res.status(404).json({message: 'User not found. No changes made.'});
         }


         res.json({message: 'Password updated successfully'});

      } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
      }
    },
    userResetPassword: async (req,res) => {
      try {
        const {id} = req.params;
        const {password} = req.body;


        const validPassword = passwordSchema.validate(password, {details: true});

        if(validPassword.length > 0){
           const errorMessages = validPassword.map(res => {
            return res.message;
           });
           return res.status(400).json({message: errorMessages});
          
        }


        const userToUpdate = await User.findByPk(id);

        if(!userToUpdate){
          return res.status(404).json({message: 'User not found'});

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update({password: hashedPassword},{where: {id}});

        res.json({message: 'Password updated successfully'});

      } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
      }
    },

    deleteUser:  async (req,res) => {
      try {

        const deleted = await User.destroy({where: {id: req.params.id}});

        if(!deleted) return res.status(404).json({message: 'User not found'});

        res.json({message: 'User deleted successfully.'})
        
      } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
      }
    }

}

module.exports = UserController;
