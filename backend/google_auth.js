//google auth
const { google } = require("googleapis");

// GOOGLE OAUTH CONFIGURATION
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/calendar"],
  prompt: "consent",
});

//defaul module
module.exports = {
  authUrl,
  oauth2Client,
};
