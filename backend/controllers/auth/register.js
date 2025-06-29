  const bcrypt = require("bcrypt");
  const {User} = require("../../models");

const register =  async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({where: {email}});
      

      if (existingUser) {
        // This means USER.create returned null, indicating the email already exists.
        return res
          .status(409)
          .json({ message: "User with this email already exists." });
      }



      const validPassword = passwordSchema.validate(password, {details: true});

      if(validPassword.length > 0){
         const errorMessages = validPassword.map(res => {
          return res.message;
         });
         return res.status(400).json({message: errorMessages});
        
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      //Create new user
      const newUser = await User.create({email, password: hashedPassword})
      
        res
          .status(201)
          .json({
            user: { id: newUser.id, email: newUser.email },
          });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }


  }

  module.exports = register