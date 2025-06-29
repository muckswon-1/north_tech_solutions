const jwt = require("jsonwebtoken");



const generateAccessToken = (user, accessTokenExpiryTime) => {
    return jwt.sign({id: user.id, role: user.role}, process.env.ACCESS_TOKEN_JWT_SECRET, {expiresIn: accessTokenExpiryTime})

}

const generateRefreshToken = (user, refreshTokenExpiryTime) => {
    return jwt.sign({id: user.id, role: user.role}, process.env.REFRESH_TOKEN_JWT_SECRET, {expiresIn: refreshTokenExpiryTime})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken

}