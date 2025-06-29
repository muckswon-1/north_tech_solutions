const transporter = require("./config");
const path = require("path");
const fs = require("fs");

const successHTMLTemplatePath = path.join(__dirname, "resetSuccess.html");
const requestEmailTemplate = path.join(__dirname, "resetRequest.html");

let successHTMLContent = fs.readFileSync(successHTMLTemplatePath, "utf-8");
let requestEmailContent = fs.readFileSync(requestEmailTemplate, "utf-8");

/**
 * 
 * @param {string} email 
 * @param {string} token 
 */



exports.sendResetPasswordEmail =  async (email, token) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`
    const finalContent = requestEmailContent.replace('{{RESET_LINK}}', resetLink);

    await transporter.sendMail({
        from: `${process.env.ADMIN_EMAIL}`,
        to: email,
        subject: "Your Sokoni B2B Verification Code",
        html: finalContent
      });
}

exports.sendPasswordResetSuccessEmail = async (email) => {
    const loginLink = `${process.env.FRONTEND_URL}/login`
    const finalContent = successHTMLContent.replace('{{LOGIN_LINK}}', loginLink);

    await transporter.sendMail({
        from: `${process.env.ADMIN_EMAIL}`,
        to: email,
        subject: "Password Reset Successful",
        html: finalContent
      
    });
}