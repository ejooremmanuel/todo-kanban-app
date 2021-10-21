const Task = require("../../models/Task");
const { User } = require("../../models/User");

//Cloudinary cloudinarySetup
const cloudinary = require("cloudinary").v2;
const cloudinarySetUp = require("../../config/cloudinarysetup");

//Controller for creating tasks
const createTask = async (req, res) => {
  if (!req.user) return res.redirect("/auth/register");
  const { title, description } = req.body;
  if (!title || !description) {
    return res.redirect("back");
  }

  if (req.file) {
    // await cloudinarySetUp();
    // const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
    //   resource_type: "auto",
    // });
    // if (!uploadedFile) {
    //   console.error("file not uploaded!");
    //   res.redirect("back");
    // }
    const newTask = await new Task({
      title,
      description,
      files: req.file.path,
      user: req.user._id,
    });
    await newTask.save();
    userTask = await User.findById(req.user._id);
    userTask.task.unshift(newTask._id);
    await userTask.save();
    return res.redirect("back");
  }
  const newTask = await new Task({
    title,
    description,
    user: req.user._id,
  });
  await newTask.save();
  userTask = await User.findById(req.user._id);
  userTask.task.unshift(newTask._id);
  await userTask.save();
  return res.redirect("back");
};

//Controller for retrieving all tasks
const getTasks = async (req, res) => {
  if (!req.user) {
    req.flash("error-message", "Login to continue");
    res.redirect("/auth/login");
  }
  const getAllTasks = User.findById(req.user._id, (err, docs) => {
    if (!err) {
      const { task } = docs;
      res.render("default/createtask", { docs: task });
    }
  })
    .populate("task")
    .sort({ _id: -1 })
    .lean();
};

//Controller for deleting a task
const deleteTask = async (req, res) => {
  if (!req.user) return res.redirect("back");
  const { taskid } = req.params;
  await Task.findByIdAndDelete(taskid).then(() => {
    res.redirect("back");
  });
};

//Controller for editing single task
const editTask = async (req, res) => {
  if (!req.user) return res.redirect("back");
  const { editid } = req.params;
  Task.findById(editid, (err, task) => {
    if (!err) {
      res.render("default/task", { task });
    }
  });
};

//Controller for Posting single edited task
postEditTask = async (req, res) => {
  if (!req.user) return res.redirect("back");
  const { title, description } = req.body;
  const { edittaskid } = req.params;

  if (req.file) {
    await cloudinarySetUp();
    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    if (!uploadedFile) {
      console.error("file not uploaded!");
      res.redirect("back");
    }
    Task.findByIdAndUpdate(
      edittaskid,
      [{ $set: { description, files: req.file.path, title } }],
      (err, result) => {
        if (!err) {
          return res.redirect("/task/createtask");
        } else {
          console.log("failed", err.message);
          return res.redirect("back");
        }
      }
    );
  } else {
    Task.findByIdAndUpdate(
      edittaskid,
      [{ $set: { description, title } }],
      (err, result) => {
        if (!err) {
          res.redirect("/task/createtask");
        } else {
          console.log("failed", err.message);
          res.redirect("back");
        }
      }
    );
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  editTask,
  postEditTask,
};
