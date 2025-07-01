const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Morgan for HTTP logging
const morgan = require("morgan");
const http = require('http');
const errorHandler = require('express-error-handler');

const server = http.createServer(app);


// import modules
const { authUrl, oauth2Client } = require("./google_auth");
const googleCalender = require("./calendar");
const ProductRouter = require("./routes/productRoutes");
const InquiryRouter = require("./routes/inquiryRoutes");
const PasswordAuthRouter = require("./routes/passwordAuthRoutes");
const path = require("path");
const db = require("./models");
const UserRouter = require("./routes/userRoutes");
const uploadRouter = require("./routes/uploads");
const CompanyRouter = require("./routes/companyRoute");

const UserDraftInquiryRouter = require("./routes/userDraftInquiryRoute");
const VerificationCenterRouter = require("./routes/verificationCenterRoute");
const {  getAllowedOrigins } = require("./utils");
const { loadDatabase } = require("./utils/loadDb");
const { loadEnvfile } = require("./utils/loadEnvfile");

loadEnvfile();

//Global Constant variables
const port = process.env.SERVER_PORT


loadDatabase();

app.use(cors(getAllowedOrigins()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'))




// TEST ROUTE
app.get("/health", (req, res) => {
  res.send("Back end server is running!");
});

//Fallback: serve index.html for ll other routes
app.all('/api', (req,res) => {
  res.sendFile(path.join(staticFilesDir, 'index.html'))
})

// PRODUCT ROUTES
app.use("/api/products", ProductRouter);

//INQUIRY ROUTES
app.use("/api/inquiry", InquiryRouter);

// USER AUTH ROUTES
app.use("/api/password-auth", PasswordAuthRouter);

//USER ROUTES
app.use("/api/users", UserRouter);

app.use("/api/upload",uploadRouter);


//COMPANY ROUTES
app.use("/api/company",CompanyRouter);

//INQUIRY DRAFT
app.use("/api/inquiry-drafts",UserDraftInquiryRouter);

// VERIFICATION CENTER
app.use("/api/verification-center",VerificationCenterRouter);


//Log error

app.use((err,req,res,next) => {
  console.log(err);
  next(err);
})

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


app.use(errorHandler({server: server}));

// START SERVER
app.listen(port, "0.0.0.0", () => { console.log(`Sokoni app listening on ${process.env.BACKEND_URL}`) });
