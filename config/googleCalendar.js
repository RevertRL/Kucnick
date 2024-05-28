const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Load client secrets from a local file.
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function loadCredentials() {
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
}

function loadToken() {
    return JSON.parse(fs.readFileSync(TOKEN_PATH));
}

async function authorize() {
    const credentials = loadCredentials();
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    const token = loadToken();
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
}

async function createEvent(auth, appointment) {
    const calendar = google.calendar({ version: 'v3', auth });
    const event = {
        summary: `${appointment.serviceType} for ${appointment.vehicleMake} ${appointment.vehicleModel}`,
        location: 'Garage Location',
        description: `Appointment for ${appointment.serviceType}`,
        start: {
            dateTime: new Date(appointment.appointmentDate).toISOString(),
            timeZone: 'America/Los_Angeles', // Adjust time zone as needed
        },
        end: {
            dateTime: new Date(new Date(appointment.appointmentDate).getTime() + 60 * 60 * 1000).toISOString(), // Assume 1 hour duration
            timeZone: 'America/Los_Angeles',
        },
        attendees: [{ email: appointment.customerEmail }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        console.log('Event created: %s', response.data.htmlLink);
    } catch (error) {
        console.error('Error creating event: %s', error.message);
    }
}

module.exports = {
    authorize,
    createEvent,
};