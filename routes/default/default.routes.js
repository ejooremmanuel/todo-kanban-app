const router = require("express").Router();
const {
  createTask,
  getTasks,
} = require("../../controllers/default/default.controller");

router.get("/createtask", getTasks);
router.post("/createtask", createTask);

module.exports = router;
