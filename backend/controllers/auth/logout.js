const { deleteCookie } = require("./cookie");

exports.logout = (req, res) => {

    // const isProduction = process.env.NODE_ENV === "production";
    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: isProduction,
    //   sameSite: isProduction ? "none" : "lax",
    //   maxAge: 0,
    // }
  
    if (!req.cookies.accessToken && !req.cookies.refreshToken) {
    //   res.clearCookie('accessToken', cookieOptions);
    //   res.clearCookie('refreshToken',cookieOptions);
    deleteCookie(res, 'accessToken');
    deleteCookie(res, 'refreshToken');

      return res.status(200).json({message: 'Logged out or tokens expired'})
    }

    if (!req.cookies.accessToken && req.cookies.refreshToken) {

      //res.clearCookie('accessToken', cookieOptions);
      deleteCookie(res, 'accessToken');

      return res.status(200).json({message: 'Logged out or tokens expired'})
    }
    

    // Implement logout logic, e.g., invalidating a session or token
    // For a stateless API (JWT), logout is often handled client-side by deleting the token.
   
    // res.clearCookie("accessToken", {
    //   httpOnly: true,
    //   secure: isProduction,
    //   sameSite: isProduction ? "none" : "lax",
    //   maxAge: 0,
    // });
    deleteCookie(res, 'accessToken');
    
    res.status(200).json({ message: "Logout successful" }); // Or 204 No Content if nothing is returned
  }