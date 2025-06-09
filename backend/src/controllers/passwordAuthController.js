const USER = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const passwordAuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const registeredUser = await USER.create({ email, password });

      if (!registeredUser) {
        // This means USER.create returned null, indicating the email already exists.
        return res
          .status(409)
          .json({ message: "User with this email already exists." });
      }
      if (registeredUser) {
        res
          .status(201)
          .json({
            user: { id: registeredUser.id, email: registeredUser.email },
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await USER.returnByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      //compare hashed database password with provided passwrd
      const isEqualPassword = await bcrypt.compare(password, user.password);
      if (isEqualPassword) {
        // Successful login
        // set a cookie

        const isProduction = process.env.NODE_ENV === "production";
        const accessToken = jwt.sign(  { id: user.id, role: user.role },process.env.ACCESS_TOKEN_JWT_SECRET,
          {expiresIn: 60}
        );

        const refreshToken = jwt.sign({id: user.id, role: user.role}, process.env.REFRESH_TOKEN_JWT_SECRET, {expiresIn: '7d'})

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' :  'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
          sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
          maxAge: 60 * 1000, // 1 day
        });
        res
          .status(200)
          .json({
            message: "Login successful",
            user: { id: user.id, email: user.email },
          });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "An error occurred during the login process." });
    }
  },
  logout: (req, res) => {
  
    if (!req.cookies.accessToken) {
      return res.status(400).json({ message: "No access token to log out." });
    }

    // Implement logout logic, e.g., invalidating a session or token
    // For a stateless API (JWT), logout is often handled client-side by deleting the token.
    const isProduction = process.env.NODE_ENV === "production";
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
        const user = await USER.returnById(req.user.id);
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
    if(!token) return res.status(401).json({message: "Missing Refresh Token"});

    jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET, (err, decoded) => {
      if(err) return res.status(403).json({message: 'Invalid refresh token'})

        const accessToken = jwt.sign(
          {id: decoded.id, role: decoded.role},
          process.env.ACCESS_TOKEN_JWT_SECRET,
          {expiresIn: 60}
        )

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
          sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
          maxAge: 60 * 1000, // 1 day
        });

        return res.sendStatus(204);

    })
  }
};

module.exports = passwordAuthController;
