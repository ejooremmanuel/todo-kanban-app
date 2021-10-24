const postCode = require("../controllers/calendar.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", postCode);

router.get("/calendar?", async (req, res) => {
  code = req.query;
  res.render("default/event", { code });
});

module.exports = router;
