const express = require("express");
const { verifyAccessToken } = require("./verify");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const { requestResetPasswordReset, verifyResetPasswordToken, resetPassword } = require("../controllers/auth/passwordReset");
const { getNewAccessToken } = require("../controllers/auth/newAccessToken");
const { adminLogin } = require("../admin/auth/adminLogin");
const { logout } = require("../controllers/auth/logout");
const { getSessionUser } = require("../controllers/auth/sessionUser");


const PasswordAuthRouter = express.Router();

PasswordAuthRouter.post(
  "/register", register
);
PasswordAuthRouter.post(
  "/login",login
);
PasswordAuthRouter.post(
  "/admin-login",
   adminLogin
)
PasswordAuthRouter.get(
  "/logout",
  logout
);
PasswordAuthRouter.get(
  "/me",
  verifyAccessToken,
  getSessionUser
);
PasswordAuthRouter.post(
  "/refresh",
  getNewAccessToken
)

PasswordAuthRouter.post(
  "/request-reset-password", requestResetPasswordReset
);

PasswordAuthRouter.get(
  "/verify-reset-password-token/:token",
  verifyResetPasswordToken
)

PasswordAuthRouter.patch(
  "/reset-password/:token",
  resetPassword
)




module.exports = PasswordAuthRouter;
