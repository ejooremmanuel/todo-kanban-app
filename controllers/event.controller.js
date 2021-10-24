const { google } = require("googleapis");
const dotenv = require("dotenv").config();

const eventController = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect
  );

  const { summary, code, description, start, end } = req.body;
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
