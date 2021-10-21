const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    task: [{ type: mongoose.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

module.exports = {
  User: model("user", userSchema),
};
