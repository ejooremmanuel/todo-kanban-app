const router = require("express").Router();
const verify = require("../../config/verify");
const upload = require("../../config/multersetup");
const {
  createTask,
  getTasks,
  deleteTask,
  editTask,
  postEditTask,
} = require("../../controllers/default/default.controller");

router.get("/createtask", verify, getTasks);
router.post("/createtask", upload.single("file"), createTask);
router.get("/delete/:taskid", deleteTask);
router.get("/edit/:editid", editTask);
router.post(
  "/updatetask/:edittaskid",
  verify,
  upload.single("filename"),
  postEditTask
);

module.exports = router;
