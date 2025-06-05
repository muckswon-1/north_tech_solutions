const USER = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { get } = require("../routes/productRoutes");


const passwordAuthController =  {
    register: async (req, res) => {
        try {
            const {email, password} = req.body;
        
            const registredUser = await USER.create({email, password});
            if(registredUser){
                res.status(201).json({user: {id: registredUser.id, email: registredUser.email}})
            } else throw new Error('User registration failed');

        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.message});
        }
    },
    login : async (req, res) => {
        try {
            const {email, password} = req.body;
             const user = await  USER.returnByEmail(email);
            if(user) {
                //compare hashed database password with provided passwrd
                const isEqualPassword = await  bcrypt.compare(password, user.password);
                if(isEqualPassword){
                    // Successful login
                    // set a cookie

                    const isProduction = process.env.NODE_ENV === 'production';
                    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.cookie('accessToken', token, {
                        httpOnly: true,
                        secure: isProduction, // True in production (HTTPS), false in dev (HTTP)
                        sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in prod, 'lax' for dev
                        maxAge: 24 * 60 * 60 * 1000, // 1 day
                    })
                     res.status(200).json({message: 'Login successful', user: {id: user.id, email: user.email}} )
            } else {
                // User not found
                res.status(401).json({ message: "Invalid email or password" }); // Or 404, but 401 is common to prevent email enumeration
           }
       } 
    } 
    catch (error) {
            console.error("Login error:", error);
            res.status(500).json({message: "An error occurred during the login process."});
        }
    }, 
    logout : (req, res) => {
        if (!req.cookies.accessToken) {
            return res.status(400).json({ message: "No access token to log out." });
        }

        // Implement logout logic, e.g., invalidating a session or token
        // For a stateless API (JWT), logout is often handled client-side by deleting the token.
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 0,
        })
        res.status(200).json({ message: "Logout successful" }); // Or 204 No Content if nothing is returned

    },
    getMe: async (req, res) => {
        try {
         if(req.user && req.user.id){
            const user = await USER.returnById(req.user.id);
            res.status(200).json({user: {id: user.id, email: user.email}});
         } else {
            res.status(401).json({message: 'Unauthorized'});
         }
        
        } catch (error) { 
            console.log(error);
            return res.status(500).json({message: error.message});
        }
    }
        
}

module.exports = passwordAuthController;