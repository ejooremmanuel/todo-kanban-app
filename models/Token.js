const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    token: { type: String },
  },
  { timestamps: true }
);

const Token = model("token", tokenSchema);

module.exports = Token;
