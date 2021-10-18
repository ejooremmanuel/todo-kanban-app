const router = require("express").Router();
const { createTask } = require("../../controllers/default/default.controller");
router.get("/createtask", (req, res) => {
  res.render("default/createtask");
});
router.post("/createtask", createTask);

module.exports = router;
