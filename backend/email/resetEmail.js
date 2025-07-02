const transporter = require("./config");
const path = require("path");
const fs = require("fs");
const { loadEnvfile } = require("../utils/loadEnvfile");

loadEnvfile();

const successHTMLTemplatePath = path.join(__dirname, "resetSuccess.html");
const requestEmailTemplate = path.join(__dirname, "resetRequest.html");

let successHTMLContent = fs.readFileSync(successHTMLTemplatePath, "utf-8");
let requestEmailContent = fs.readFileSync(requestEmailTemplate, "utf-8");

/**
 * 
 * @param {string} email 
 * @param {string} token 
 */


const mode = process.env.NODE_ENV
let frontEndLink

if (mode === "development") {
    frontEndLink = process.env.DEV_FRONTEND_URL
} else if (mode === "staging") {
    frontEndLink = process.env.STAGING_FRONTEND_URL
} else if (mode === "production") {
    frontEndLink = process.env.FRONTEND_URL
}


exports.sendResetPasswordEmail = async (email, token) => {

    const resetLink = `${frontEndLink}/reset-password/${token}`

    const finalContent = requestEmailContent.replace('{{RESET_LINK}}', resetLink);

    await transporter.sendMail({
        from: `${process.env.ADMIN_EMAIL}`,
        to: email,
        subject: "Your Sokoni B2B Verification Code",
        html: finalContent
    });
}

exports.sendPasswordResetSuccessEmail = async (email) => {
    const loginLink = `${frontEndLink}/login`
    const finalContent = successHTMLContent.replace('{{LOGIN_LINK}}', loginLink);

    await transporter.sendMail({
        from: `${process.env.ADMIN_EMAIL}`,
        to: email,
        subject: "Password Reset Successful",
        html: finalContent

    });
}