const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  
  }
});


