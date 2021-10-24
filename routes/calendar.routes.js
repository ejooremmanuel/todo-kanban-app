const postCode = require("../controllers/calendar.controller");
const eventCreate = require("../controllers/event.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", eventCreate);

router.get("/calendar?", postCode, async (req, res) => {
  const { code } = req.query;
  console.log(refresh_token);
  res.render("default/event", { code });
});

module.exports = router;
