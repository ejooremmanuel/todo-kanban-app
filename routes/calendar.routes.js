const postCode = require("../controllers/calendar.controller");
const eventCreate = require("../controllers/event.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", eventCreate);

router.get("/calendar?", [postCode, postCode], async (req, res) => {
  const code = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const newToken = await new Token({
        token: tokens.refresh_token,
      });
      await newToken.save();
      const getUser = await User.findById(req.user._id);
      getUser.token = newToken._id;
      await getUser.save();

      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
    const newToken = await new Token({
      token: tokens.access_token,
    });
    await newToken.save();
    const getUser = await User.findById(req.user._id);
    getUser.token = newToken._id;
    await getUser.save();
  });

  oauth2Client.setCredentials({
    refresh_token: tokens.access_token,
  });
  res.render("default/event");
});

module.exports = router;
