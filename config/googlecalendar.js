const { google } = require("googleapis");
const dotenv = require("dotenv").config();
const open = require("open");
const axios = require("axios").default;

const CalendarApi = async (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect
  );

  // generate a url that asks permissions for Google Calendar scopes
  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "online",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  console.log(url);
  // async function getCode() {
  //   const { tokens } = await oauth2Client.getToken(code);
  //   oauth2Client.setCredentials(tokens);

  //   oauth2Client.on("tokens", (tokens) => {
  //     if (tokens.refresh_token) {
  //       // store the refresh_token in my database!
  //       console.log(tokens.refresh_token);
  //     }
  //     console.log(tokens.access_token);
  //   });

  //   oauth2Client.setCredentials({
  //     refresh_token: tokens.refresh_token,
  //   });
  // }

  // getCode();
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  next();
};

module.exports = CalendarApi;
