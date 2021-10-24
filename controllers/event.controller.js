const { google } = require("googleapis");
const dotenv = require("dotenv").config();
const { User } = require("../models/User");

const eventController = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect
  );

  const { summary, description, start, end } = req.body;

  // oauth2Client.setCredentials();

  let event = {
    summary,
    location: "NG",
    description,
    end: {
      dateTime: end,
      // dateTime: "",
      timeZone: "UTC+1",
    },
    start: {
      // dateTime: "",
      dateTime: start,
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
        req.flash(
          "error-message",
          "There was an error contacting the Calendar service: " + err
        );
        return res.redirect("/task/createtask");
      }
      req.flash("success-message", `view your event ${event.data.htmlLink}`);
      return res.redirect("/task/createtask");
    }
  );
};

module.exports = eventController;
