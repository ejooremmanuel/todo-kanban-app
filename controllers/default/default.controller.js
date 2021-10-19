const Task = require("../../models/Task");
const User = require("../../models/User");

//Cloudinary cloudinarySetup
const cloudinary = require("cloudinary").v2;
const cloudinarySetUp = require("../../config/cloudinarysetup");

//Controller for creating tasks
const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.redirect("back");
  }

  if (req.file) {
    // await cloudinarySetUp();
    // const uploadedFile = await cloudinary.uploader.upload(req.file.path);
    const newTask = await new Task({
      title,
      description,
      files: req.file.path,
    });
    await newTask.save();
    return res.redirect("back");
  }
  const newTask = await new Task({
    title,
    description,
  });
  await newTask.save();
  return res.redirect("back");
};

const getTasks = async (req, res) => {
  const getAllTasks = Task.find((err, docs) => {
    if (!err) {
      res.render("default/createtask", { docs });
    }
  })
    .sort({ _id: -1 })
    .lean();
};

const deleteTask = async (req, res) => {
  const { taskid } = req.params;
  await Task.findByIdAndDelete(taskid).then(() => {
    res.redirect("back");
  });
};

const editTask = async (req, res) => {
  const { editid } = req.params;
  Task.findById(editid, (err, task) => {
    if (!err) {
      res.render("default/task", { task });
    }
  });
};

postEditTask = async (req, res) => {
  const { title, description } = req.body;
  const { edittaskid } = req.params;

  if (req.file) {
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
