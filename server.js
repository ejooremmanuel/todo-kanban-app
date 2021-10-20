const express = require("express");
const ejs = require("ejs");
const taskRoutes = require("./routes/default/default.routes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const open = require("open");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/task", taskRoutes);

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.send("Page not found");
  next();
});

// open("http://localhost:4000/task/createtask");

app.listen(port, () => {
  console.log("Server listening on port", "::", port);
});
