const getCode = require("../controllers/calendar.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("default/home");
});

router.get(
  "/calendar?",
  (req, res, next) => {
    console.log(req.query);
    code = req.query.code;
    console.log(code);
    res.render("default/event");
    next();
  },
  getCode
);

module.exports = router;
