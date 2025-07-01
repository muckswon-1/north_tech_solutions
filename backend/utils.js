const nodemailer = require("nodemailer");
const { DateTime } = require("luxon");
const winston = require('winston');
const PasswordValidator = require("password-validator");
const db = require("./models");

require("dotenv").config();

const loadEnvfile = () => {
  if (process.env.NODE_ENV === "production") {
    require("dotenv").config({ path: ".env.production" });
  } else if(process.env.NODE_ENV === "staging") {
    require("dotenv").config({ path: ".env.staging" });
  }else {
    require("dotenv").config({ path: ".env.development" });
  }


};

loadEnvfile();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  
  }
});


const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();



const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `${process.env.ADMIN_EMAIL}`,
    to: email,
    subject: "Your Sokoni B2B Verification Code",
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  });

}


const getAllowedOrigins = () => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.0.102:5173",
    "https://staging-sokoni.muckswon.com",
    "https://sokoni.muckswon.com/"

  ]

  return {
    origin: (origin, callback) => {
      //Allow requests with no origins
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }

}

async function initalizeDB(){
  try {
    await db.sequelize.authenticate();
    console.log('Databse connection has been established successfully')
    
  } catch (error) {
    throw error
  }
}















































//get start time and end time
const getStartTimeAndEndTime = (
  meetingTime,
  meetingDate,
  durationInMinutes,
) => {
  const dateTimeString = `${meetingDate} ${meetingTime}`;

  const startDateTime = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd h:mm", {
    zone: "Africa/Nairobi",
  });

  if (!startDateTime.isValid) {
    console.error("Invalid startDateTime: ", startDateTime.invalidExplanation);
    return "Invalid meeting date or  time format";
  }
  const endDateTime = startDateTime.plus({ minutes: durationInMinutes });

  const isoStartDateTime = startDateTime.toISO();
  const isoEndDateTime = endDateTime.toISO();

  return {
    startDateTime: isoStartDateTime,
    endDateTime: isoEndDateTime,
  };
};

// get calendar id
const getCalendarId = async (calendar, calendarSummary, google_auth) => {
  const calendarList = await calendar.calendarList.list();

  let targetCalendar = calendarList.data.items.find(
    (cal) => cal.summary === calendarSummary,
  );

  if (!targetCalendar) {
    console.log("NorthtechB2B calendar not found");
    const newCalendar = await calendar.calendars.insert({
      auth: google_auth,
      requestBody: {
        summary: calendarSummary,
        timeZone: "Africa/Nairobi",
      },
    });

    targetCalendar = newCalendar.data;
  }

  return targetCalendar.id;
};

const sendMail = async () => {

  const mailOptions = {
    from: "muckswon@electricaldistribution.ca",
    to: email,
    subject: "Meeting Scheduled",
    html: `
            <p>Hi ${name},</p>
            <p>Your meeting has been scheduled successfully! Here are the details:</p>
            <ul>
                <li>Business Type: ${businessType}</li>
                <li>Meeting Date: ${meetingDate}</li>
                <li>Meeting Time: ${meetingTime}</li>
            </ul>
            <a href="${meetingLink}" target="_blank">Click here to view the meetig on your calendar</a>
            <p>Thank you for using our service!</p>
            <p>Best regards,</p>
            <p>Mucks</p>
        `,
  };

  await transporter.sendMail(mailOptions);

  // Send email to user with nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });
};


const infoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'})
  ]
})


let passwordSchema = new PasswordValidator();

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().symbols()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);


const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword
}







module.exports = {
  getCalendarId,
  sendMail,
  getStartTimeAndEndTime,
  generateCode,
  sendVerificationEmail,
  passwordSchema,
  loadEnvfile,
  getAllowedOrigins,
  infoLogger,
  hashPassword,
  initalizeDB
};
