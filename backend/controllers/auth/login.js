const {User} = require("../../models");
const bcrypt = require("bcrypt");

const {  generateAccessToken, generateRefreshToken } = require("./jwtTokens");
const { generateCookie, accessTokenExpiryTime, refreshTokenExpiryTime } = require("./cookie");



 const login =  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({where : {email}});

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isEqualPassword = await bcrypt.compare(password, user.password);

      if(!isEqualPassword) {
        return  res.status(401).json({ message: "Invalid email or password" });
      }
    
        const accessToken = generateAccessToken(user, accessTokenExpiryTime);
        const refreshToken = generateRefreshToken(user, refreshTokenExpiryTime);    
        generateCookie(res, 'refreshToken', refreshToken, refreshTokenExpiryTime);
        generateCookie(res, 'accessToken', accessToken, accessTokenExpiryTime);


        res
          .status(200)
          .json({
            message: "Login successful",
            user: { id: user.id, email: user.email, role: user.role },
          });
  

    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "An error occurred during the login process." });
    }
  }

  module.exports = login;