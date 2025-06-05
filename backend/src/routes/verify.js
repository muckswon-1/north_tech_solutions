const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
   // const authHeader = req.headers['authorization'];
   // const accessToken = authHeader && authHeader.split(' ')[1];
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({message: 'Access token missing'});
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid access token'});
    }

}



module.exports = verifyToken;