const bcrypt = require("bcrypt");
const {User} = require("../../models");
const crypto = require('crypto');
const { sendResetPasswordEmail, sendPasswordResetSuccessEmail } = require("../../email/resetEmail");
const { Op } = require("sequelize");


exports.requestResetPasswordReset =  async (req,res) => {
   
  
    try {

        const {email} = req.body;
        const user = await User.findOne({where: {email}});
    
        if(!user) {
          return res.status(404).json({message: 'User not found with this email'});
        }
    
        const token = crypto.randomBytes(32).toString('hex');
        const expires =  Date.now() + 1000 * 60 * 30; // 30 minutes
    
        //const hashedToken = await bcrypt.hash(token, 10);
    
        await User.update({
            resetPasswordToken: token,
            resetPasswordExpires: new Date(expires)
        },{
          where: {email}    
        });

       await sendResetPasswordEmail(email,token);

       res.json({message: 'Password reset email sent successfully'});

      
  }catch(error){
    console.log(error);
    res
    .status(500)
    .json({ message: "An error occurred during password reset" });
  }
  }

  exports.verifyResetPasswordToken = async (req,res) => {
    const {token} = req.params;
    const user = await User.findOne(
        {where: {
            resetPasswordToken: token,
            resetPasswordExpires: {[Op.gt]: Date.now()}
        
        }}
    );

    if(!user) {
        return res.status(400).json({message: 'Invalid or expired token'});
    
    }

    res.json({message: 'Token is valid'})

  }

  exports.resetPassword = async (req,res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {[Op.gt]: Date.now()}
            
            }
        });

        if(!user){
            return res.status(400).json({message: 'Invalid or expired token'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        }
        ,{
            where: {id: user.id}
        }
        );

        await sendPasswordResetSuccessEmail(user.email);

        return res.json({message: 'Password reset successfully'})


}catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occurred during password reset'});
    }
    
  }
