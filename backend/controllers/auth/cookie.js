
exports.accessTokenExpiryTime = 7 * 24 * 60 * 60 * 1000;
exports.refreshTokenExpiryTime = 30 * 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";



exports.generateCookie = (res, name, value, expiryTime) => {
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' :  'lax',
        maxAge: expiryTime
    }

    return res.cookie(name, value,cookieOptions)
};

exports.deleteCookie = (res, name) => {
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' :  'lax',
        maxAge: 0
    }

    res.clearCookie(name,cookieOptions);

}

