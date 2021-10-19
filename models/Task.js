const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    files: {
      type: [],
    },
    user: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Task = model("task", taskSchema);

module.exports = Task;
