//dot env config
require('dotenv').config();

//google auth
const { google } = require('googleapis');
const nodemailer = require('nodemailer');



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


// GOOGLE OAUTH CONFIGURATION

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);


// INITIATE AUTH FLOW
app.get("/mucks/auth/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar"],
        prompt: "consent",
    });
    res.redirect(authUrl);
})

// HANDLE REDIRECT
app.get("/mucks/oauth/google/callback", async (req, res) => {
    try {
        const {code} = req.query; // extract authorization code from the query string

        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
         // console.log("Tokens received", tokens);

          const refreshToken = tokens.refresh_token



        //save the refresh token securely
       // process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;
       if(refreshToken){
        console.log(`Your refresh token is: ${refreshToken}`)
        res.redirect(`http://localhost:5173/?authenticated=true`);
       }else{
        res.redirect(`http://localhost:5173/?authenticated=false`);
       }


    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).send("Authentication failed");
    }
})


// TEST ROUTE TO VERIFY OAUTH2 SET UP
app.get("/mucks/test-auth", async (req, res) => {
    try {
        //use the refresh token to fetch a new access token
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

        if(!refreshToken){
            return res.status(500).json({success: false, message: "Refresh token is not set in .env"});
        }

        oauth2Client.setCredentials({
            refresh_token: refreshToken
        })
        
        const {token} = await oauth2Client.getAccessToken();


        

        res.json({
            success: true,
            message: "Authentication successful",
            access_token: token
        })

        //   oauth2Client.setCredentials(tokens.credentials);

        // res.json({
        //     message: "Authentication successful",
        //     tokens: oauth2Client.credentials
 
        // })

        


     

        // Test accessing the Google Calendar API
        // const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        // const response = await calendar.events.list();

        // res.json({
        //     message: "Authentication successful",
        //     calendars: response.data
        // })

    }catch(err){
        console.error("Error during authentication:", err);
        res.status(500).json({ error: "Authentication failed" });
    }
})

// ROUTE FOR SCHEDULING MEETINGS
app.post("/mucks/schedule-meeting", async (req, res) => {
    
    try {
        //extract details from the request body 
        const {name, email, businessType, meetingDate, meetingTime} = req.body;

        //validate required fileds
        if(!name || !email || !businessType || !meetingDate || !meetingTime){
            return res.status(400).json({success: false, message: "All fields are required"});
        }




        //use the refresh token to fetch a new access token
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

        if(!refreshToken){
            return res.status(500).json({success: false, message: "Refresh token is not set in .env"});
        }

        oauth2Client.setCredentials({
            refresh_token: refreshToken
        })
        
        const {token} = await oauth2Client.getAccessToken();

        //create a google calendar event
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const {DateTime} = require("luxon");


        //Parse start and end times
        console.log(meetingDate, meetingTime);

        const dateTimeString = `${meetingDate} ${meetingTime}`;

        const startDateTime = DateTime.fromFormat(dateTimeString, 'yyyy-MM-dd h:mm', {zone: 'utc'});

        if(!startDateTime.isValid){
            console.error("Invalid startDateTime: ", startDateTime.invalidExplanation)
            return res.status(400).json({success: false, message: "Invalid meeting date or  time format"});
        }
        const endDateTime = startDateTime.plus({minutes: 30});
        

        const isoStartDateTime = startDateTime.toISO();
        const isoEndDateTime = endDateTime.toISO();

       
        

        
        const event = {
            summary : `Meeting with ${name}`,
            description: `Business Type: ${businessType}`,
            start: {
                dateTime: isoStartDateTime
            },
            end: {
                dateTime: isoEndDateTime,
                timezone: "UTC"
            },

            attendees: [
                {email}
            ],

            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    },
                    status: {
                        statusCode: "success"
                    }
                }
            },


            reminders: {
                useDefault: true
            },
            
        }

        //Insert the event into the primary calendar
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: "primary",
            resource: event,
            sendUpdates: "all",
            conferenceDataVersion: 1
        });

        const meetingLink = response.data.htmlLink;

        console.log(process.env.ADMIN_EMAIL_PASSWORD)
        console.log(process.env.ADMIN_EMAIL)


        // Send email to user with nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD
            }
        });

        // const mailOptions = {
        //     from: "muckswon@electricaldistribution.ca",
        //     to: email,
        //     subject: "Meeting Scheduled",
        //     html:`
        //     <p>Hi ${name},</p>
        //     <p>Your meeting has been scheduled successfully! Here are the details:</p>
        //     <ul>
        //         <li>Business Type: ${businessType}</li>
        //         <li>Meeting Date: ${meetingDate}</li>
        //         <li>Meeting Time: ${meetingTime}</li>
        //     </ul>
        //     <a href="${meetingLink}" target="_blank">Click here to view the meetig on your calendar</a>
        //     <p>Thank you for using our service!</p>
        //     <p>Best regards,</p>
        //     <p>Mucks</p>
        // `};

        // await transporter.sendMail(mailOptions);


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

})




// TEST ROUTE
app.get('/', (req, res) => {
    res.send('Back end server is running!');
});


// START SERVER 
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});