const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    task: [{ type: mongoose.Types.ObjectId, ref: "task" }],
    token: [{ type: mongoose.Types.ObjectId, ref: "token" }],
  },
  { timestamps: true }
);

module.exports = {
  User: model("user", userSchema),
};
