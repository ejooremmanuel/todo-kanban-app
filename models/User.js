const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = {
  User: model("user", userSchema),
};
