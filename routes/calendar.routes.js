const postCode = require("../controllers/calendar.controller");
const eventCreate = require("../controllers/event.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", eventCreate);

router.get(
  "/calendar?",
  (req, res, next) => {
    res.render("default/event");
    next();
  },
  postCode
);

module.exports = router;
