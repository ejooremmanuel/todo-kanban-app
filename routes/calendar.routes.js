const postCode = require("../controllers/calendar.controller");
const eventCreate = require("../controllers/event.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", eventCreate);

router.get("/calendar?", postCode, async (req, res, next) => {
  const { code } = req.query;
  res.render("default/event", { code });
  next();
});

module.exports = router;
