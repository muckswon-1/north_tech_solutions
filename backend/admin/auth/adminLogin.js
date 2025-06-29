const {User} = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req,res) => {
    try {

    const { email, password } = req.body;

      const user = await User.findOne({where : {email}});


      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if(user.role !== 'admin') {
        return res.status(401).json({message: 'Access denied. You are not an admin'})
      }

      //compare hashed database password with provided passwrd
      const isEqualPassword = await bcrypt.compare(password, user.password);

      if(!isEqualPassword) {
        return  res.status(401).json({ message: "Invalid email or password" });
      }
     
        // Successful login
        // set a cookie

         const refreshTokenExpiryTime = 30 * 24 * 60 * 60 * 1000;
         const accessTokenExpiryTime = 7 * 24 * 60 * 60 * 1000;

        const isProduction = process.env.NODE_ENV === "production";
        const accessToken = jwt.sign(  { id: user.id, role: user.role },process.env.ACCESS_TOKEN_JWT_SECRET,
          {expiresIn: accessTokenExpiryTime} 
        );

        const refreshToken = jwt.sign({id: user.id, role: user.role}, process.env.REFRESH_TOKEN_JWT_SECRET, {expiresIn: refreshTokenExpiryTime}) // 1 month

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' :  'lax',
          maxAge: refreshTokenExpiryTime
        })

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
          sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
          maxAge: accessTokenExpiryTime, // 1 day
        });

        res
          .status(200)
          .json({
            message: "Login successful",
            user: { id: user.id, email: user.email, role: user.role },
          });
    //   } else {
    //     res.status(401).json({ message: "Invalid email or password" });

    //  }

    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "An error occurred during the login process." });
    }

  }