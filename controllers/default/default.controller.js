const Task = require("../../models/Task");
const User = require("../../models/User");

//Controller for creating tasks
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.redirect("back");
  }
  const newTask = await new Task({ title, description });
  await newTask.save();
  res.redirect("back");
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

module.exports = {
  createTask,
  getTasks,
};
