
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models");





const passwordAuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({where: {email}});

      //const registeredUser = await USER.create({ email, password });

      if (existingUser) {
        // This means USER.create returned null, indicating the email already exists.
        return res
          .status(409)
          .json({ message: "User with this email already exists." });
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


  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({where : {email}});


      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
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
  },

  adminLogin: async (req,res) => {
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

  },
  logout: (req, res) => {

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 0,
    }
  
    if (!req.cookies.accessToken && !req.cookies.refreshToken) {
      res.clearCookie('accessToken', cookieOptions);
      res.clearCookie('refreshToken',cookieOptions);

      return res.status(200).json({message: 'Logged out or tokens expired'})
    }

    if (!req.cookies.accessToken && req.cookies.refreshToken) {

      res.clearCookie('accessToken', cookieOptions);

      return res.status(200).json({message: 'Logged out or tokens expired'})
    }
    

    // Implement logout logic, e.g., invalidating a session or token
    // For a stateless API (JWT), logout is often handled client-side by deleting the token.
   
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successful" }); // Or 204 No Content if nothing is returned
  },
  getMe: async (req, res) => {
    try {
      if (req.user && req.user.id) {
        const user = await User.findByPk(req.user.id,{
          attributes: ['id', 'email']
        });

        if(!user){
          return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({ user: { id: user.id, email: user.email } });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getNewAccessToken: async (req,res)  => {
    const token = req.cookies.refreshToken;
    if(!token){
      return  res.status(401).json({message: 'Missing refresh token'});
      };

    jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET, async (err, decoded) => {
      if(err){ 
        return res.status(403).json({message: 'Invalid refresh token'})
      }

      const user = await User.findByPk(decoded.id);

      if(!user){
        return res.status(403).json({message: 'User no longer exists'});
      }

      const accessTokenExpiryTime = 7 * 24 * 60 * 60 * 1000;
      const refreshTokenExpiryTime = 30 * 24 * 60 * 60 * 1000;

      const accessToken = jwt.sign(
         {id: decoded.id, role: decoded.role},
          process.env.ACCESS_TOKEN_JWT_SECRET,
          {expiresIn: accessTokenExpiryTime}
        )

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
          sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
          maxAge: refreshTokenExpiryTime
        });

        return res.sendStatus(204);

    })
  }
};

module.exports = passwordAuthController;
