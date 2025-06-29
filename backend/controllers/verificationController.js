const { generateCode,  } = require("../utils");
const { User, Company } = require("../models");
const { sendVerificationEmail } = require("../email/verificationEmail");

module.exports = {
    sendEmailCode: async (req,res) => {
        const {email} = req.body;
        const {userId} = req.params;
        

        if(!email) return res.status(400).json({message: 'Email is required'});

        try {
            const code = generateCode();
          

            //Store code and expiry in DB
            await User.update(
                {
                emailVerificationCode: code,
                emailVerificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000)
              },
              {where: {id:userId,email}}
        );

        await sendVerificationEmail(email,code);

        res.status(200).json({message: 'Verification code sent successfully'});

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    verifyEmailCode:  async (req,res) => {
        const {userId} = req.params;
        console.log(userId);
        const {code} = req.body;
        console.log(code);
        const user = await User.findOne({where: {id:userId}});
        console.log(user);

        if(!user || !user.emailVerificationCode || user.emailVerificationCode !== code) return res.status(400).json({message: 'Invalid code'});

        if(user.emailVerificationCodeExpiry < new Date()){
            return res.status(400).json({message: 'Code has expired'});
        }

        await User.update(
            {
            emailVerificationCode: null,
            emailVerificationCodeExpiry: null
          },
          {where: {id:userId}}
        );

        await Company.update(
            {
                verifiedEmail: true
            },
            {
                where: {userId}
            }
        )

        res.json({message: 'Email verified successfully'});

    },
    sendPhoneNumberCode: (req,res) => {
        const {userId} = req.params;
        const {phoneNumber} = req.body;
      

       if(!phoneNumber) return res.status(400).json({message: 'Phone number is required'});

        console.log(phoneNumber);

    },

    verifyPhoneNumberCode: (req,res) => {

    },
    profileVerificationCompleted: (req,res) => {

    }
}