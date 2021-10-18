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

module.exports = {
  createTask,
};
