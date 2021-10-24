const getCode = require("../controllers/calendar.controller");

const router = require("express").Router();

const eventData = async (req, res, next) => {
  const { code, summary, start, end, description } = req.body;
  next();
};

router.get("/", (req, res) => {
  res.render("default/home");
});

router.post("/calendarevent", eventData, getCode);

router.get("/calendar?", async (req, res) => {
  console.log(req.query);
  code = req.query.code;
  console.log(code);
  res.render("default/event", { code });
});

module.exports = router;
