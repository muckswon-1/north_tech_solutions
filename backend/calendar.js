const { google } = require("googleapis");
const { getStartTimeAndEndTime, getCalendarId } = require("./utils");


const googleCalender = async (refreshToken, google_auth, data) => {
    google_auth.setCredentials({refresh_token: refreshToken });

    //create a google calendar event
    const calendar = google.calendar({ version: "v3", auth: google_auth });

    const calendarId = await getCalendarId(calendar, "NorthTechB2B",google_auth);

    const {startDateTime: isoStartDateTime, endDateTime: isoEndDateTime} = getStartTimeAndEndTime(data.meetingTime, data.meetingDate,30)

   
    const event = {
        summary : `Meeting with ${data.name}`,
        description: `Business Type: ${data.businessType}`,
        start: {
            dateTime: isoStartDateTime
        },
        end: {
            dateTime: isoEndDateTime,
        },

        attendees: [
            {email: data.email},
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


     // Insert the event into the primary calendar
        const newCalendarEvent = await calendar.events.insert({
            auth: google_auth,
            calendarId: calendarId,
            resource: event,
            sendUpdates: "all",
            conferenceDataVersion: 1
        });

        return newCalendarEvent

}

module.exports = googleCalender;