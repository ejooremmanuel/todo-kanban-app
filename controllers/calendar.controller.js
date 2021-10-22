const { google } = require("googleapis");
const dotenv = require("dotenv").config();
const open = require("open");
const url = require("url");
const querystring = require("querystring");

const Calendar = async (req, res) => {
  console.log(req.params);
  const oauth2Client = new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect
  );

  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  const code = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  oauth2Client.setCredentials({
    refresh_token: tokens.access_token,
  });

  let event = {
    summary: "Hello",
    location: "Anuja/NG",
    description: "This is a test description",
    end: {
      date: "2021-10-30",
      // dateTime: "",
      timeZone: "UTC+1",
    },
    start: {
      // dateTime: "",
      date: "2021-11-21",
      timeZone: "UTC+1",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  google.calendar({ version: "v3" }).events.insert(
    {
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }

      req.flash(
        "success-message",
        `A test event has been created. Copy <a href=${event.data.htmlLink}>view it here</a>`
      );
      return res.redirect("/task/createtask");
    }
  );
};
module.exports = Calendar;
