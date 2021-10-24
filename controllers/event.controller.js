const { google } = require("googleapis");

const eventController = (req, res) => {
  const { summary, description, start, end } = req.body;
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
