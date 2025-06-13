const express = require("express");
const passwordAuthController = require("../controllers/passwordAuthController");
const { verifyAccessToken } = require("./verify");


const PasswordAuthRouter = express.Router();

PasswordAuthRouter.post(
  "/password-auth/register",
  passwordAuthController.register,
);
PasswordAuthRouter.post(
  "/password-auth/login",
  passwordAuthController.login,
);
PasswordAuthRouter.get(
  "/password-auth/logout",
  passwordAuthController.logout,
);
PasswordAuthRouter.get(
  "/password-auth/me",
  verifyAccessToken,
  passwordAuthController.getMe,
);
PasswordAuthRouter.post(
  "/password-auth/refresh",
  passwordAuthController.getNewAccessToken
)

module.exports = PasswordAuthRouter;
