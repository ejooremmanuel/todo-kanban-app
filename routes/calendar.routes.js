const getCode = require("../controllers/calendar.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.get(
  "/calendar?",
  (req, res, next) => {
    res.render("default/event");
    console.log(req.query);

    next();
  },
  getCode
);

module.exports = router;
