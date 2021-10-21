const { globalVariables } = require("./config/configuration");
const express = require("express");
const ejs = require("ejs");
const taskRoutes = require("./routes/default/default.routes");
const authRoutes = require("./routes/auth/auth.routes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const open = require("open");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");

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

//Set up cookie and session
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: Date.now() + 360000 * 24 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 14 * 24 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(globalVariables);

app.use("/task", taskRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("default/home");
});

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.send("Page not found");
  next();
});

// open("http://localhost:4000/");

app.listen(port, () => {
  console.log("Server listening on port", "::", port);
});
