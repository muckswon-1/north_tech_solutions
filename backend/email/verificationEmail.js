const { transporter } = require("./config");

const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `${process.env.ADMIN_EMAIL}`,
    to: email,
    subject: "Your Sokoni B2B Verification Code",
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  });

}

module.exports = {
  sendVerificationEmail
}