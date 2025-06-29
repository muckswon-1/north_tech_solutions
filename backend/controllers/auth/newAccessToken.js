const {User} = require("../../models");
const { accessTokenExpiryTime,  generateCookie } = require("./cookie");
const { generateAccessToken } = require("./jwtTokens");


exports.getNewAccessToken = async (req,res)  => {
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

     

      const accessToken = generateAccessToken(user, accessTokenExpiryTime);
      generateCookie(res, 'accessToken', accessToken, accessTokenExpiryTime);

      
      
    //   jwt.sign(
    //      {id: decoded.id, role: decoded.role},
    //       process.env.ACCESS_TOKEN_JWT_SECRET,
    //       {expiresIn: accessTokenExpiryTime}
    //     )



        // const isProduction = process.env.NODE_ENV === "production";

        // res.cookie("accessToken", accessToken, {
        //   httpOnly: true,
        //   secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
        //   sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
        //   maxAge: refreshTokenExpiryTime
        // });

        return res.sendStatus(204);

    })
}