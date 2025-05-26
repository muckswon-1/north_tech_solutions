
//Load environemt file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envFile });

const {authUrl, oauth2Client} = require('./google_auth');
const googleCalender = require('./calendar');

//express config
const express = require('express');
const app = express();
const cors = require('cors');




//  MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PORT
const port = process.env.SERVER_PORT || 3000;

// TEST ROUTE
app.get('/mucks', (req, res) => {
    res.send('Back end server is running!');
});



// INITIATE AUTH FLOW
app.get("/mucks/auth/google", (req, res) => {
    res.redirect(authUrl);
})

// HANDLE REDIRECT
app.get("/mucks/oauth/google/callback", async (req, res) => {
    try {
        const {code} = req.query; // extract authorization code from the query string

        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
       

          const refreshToken = tokens.refresh_token

       if(refreshToken){
        res.redirect(`${process.env.FRONTEND_URL}/?authenticated=true`);
       }else{
        res.redirect(`${process.env.FRONTEND_URL}/?authenticated=false`);
       }


    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).send("Authentication failed");
    }
});


// ROUTE FOR SCHEDULING MEETINGS
app.post("/mucks/schedule-meeting", async (req, res) => {
    
    try {
    
        const meetingData = req.body;

        //validate required fileds
        if(!meetingData.name || !meetingData.email || !meetingData.businessType || !meetingData.meetingDate || !meetingData.meetingTime){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        //use the refresh token to fetch a new access token
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
        
        if(!refreshToken){
            return res.status(500).json({success: false, message: "Refresh token is not set in .env"});
        }

        const response = await googleCalender(refreshToken,oauth2Client,meetingData);

        //respond with success
        res.status(200).json({
            success: true,
            message: "Meeting scheduled successfully",
            event: response.data
        })

    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ error: "Failed to schedule meeting" }) 
    }

});


// START SERVER 
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});