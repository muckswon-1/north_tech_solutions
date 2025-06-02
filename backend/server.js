const express = require("express");
const app = express();
const cors = require("cors");

//Morgan for HTTP logging
const morgan = require("morgan");

// import modules
const { authUrl, oauth2Client } = require("./google_auth");
const googleCalender = require("./calendar");
const ProductRouter = require("./src/routes/productRoutes");
const InquiryRouter = require("./src/routes/inquiryRoutes");

//Load environemt file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
require("dotenv").config({ path: envFile });

//Global Constant variables
const port = process.env.SERVER_PORT || 3000;

//  MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Back end server is running!");
});

// PRODUCT ROUTES
app.use("/sokoni-api/products", ProductRouter);

//INQUIRY ROUTES
app.use("/sokoni-api/inquiry", InquiryRouter);

// INITIATE AUTH FLOW
app.get("/auth/google", (req, res) => {
  res.redirect(authUrl);
});

// HANDLE REDIRECT
app.get("/oauth/google/callback", async (req, res) => {
  try {
    const { code } = req.query; // extract authorization code from the query string

    const { tokens } = await oauth2Client.getToken(code);

    console.log("tokens", tokens);

    oauth2Client.setCredentials(tokens);

    const isAuthenticated = tokens.access_token ? true : false;

    res.redirect(
      `${process.env.FRONTEND_URL}/?authenticated=${isAuthenticated}`,
    );
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).send("Authentication failed");
  }
});

// ROUTE FOR SCHEDULING MEETINGS
app.post("/schedule-meeting", async (req, res) => {
  try {
    const meetingData = req.body;

    //validate required fileds
    if (
      !meetingData.name ||
      !meetingData.email ||
      !meetingData.businessType ||
      !meetingData.meetingDate ||
      !meetingData.meetingTime
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //use the refresh token to fetch a new access token
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
      return res
        .status(500)
        .json({ success: false, message: "Refresh token is not set in .env" });
    }

    const response = await googleCalender(
      refreshToken,
      oauth2Client,
      meetingData,
    );

    //respond with success
    res.status(200).json({
      success: true,
      message: "Meeting scheduled successfully",
      event: response.data,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Failed to schedule meeting" });
  }
});

// START SERVER
app.listen(port, () => {
  console.log(
    `Example app listening on ${process.env.BACKEND_URL} port ${port}`,
  );
});
