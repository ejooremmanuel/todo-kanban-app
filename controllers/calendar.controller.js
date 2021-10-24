const { google } = require("googleapis");
const { User } = require("../models/User");
const Token = require("../models/Token");

const dotenv = require("dotenv").config();
const open = require("open");
const url = require("url");
const querystring = require("querystring");

const Calendar = async (req, res, next) => {
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

  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const newToken = new Token({
        token: tokens.refresh_token,
      });
      await newToken.save();
      const getUser = User.findById(req.user._id);
      getUser.token = newToken._id;
      await getUser.save();

      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  oauth2Client.setCredentials({
    refresh_token: tokens.access_token,
  });

  next();
};
module.exports = Calendar;
