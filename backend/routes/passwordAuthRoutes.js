const express = require("express");
const passwordAuthController = require("../controllers/passwordAuthController");
const { verifyAccessToken } = require("./verify");


const PasswordAuthRouter = express.Router();

PasswordAuthRouter.post(
  "/register",
  passwordAuthController.register,
);
PasswordAuthRouter.post(
  "/login",
  passwordAuthController.login,
);
PasswordAuthRouter.post(
  "/admin-login",
  passwordAuthController.adminLogin
)
PasswordAuthRouter.get(
  "/logout",
  passwordAuthController.logout,
);
PasswordAuthRouter.get(
  "/me",
  verifyAccessToken,
  passwordAuthController.getMe,
);
PasswordAuthRouter.post(
  "/refresh",
  passwordAuthController.getNewAccessToken
)

module.exports = PasswordAuthRouter;
