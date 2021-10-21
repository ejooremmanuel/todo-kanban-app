const { User } = require("../../models/User");
const bcryptjs = require("bcryptjs");
// Passport set up
const { Strategy } = require("passport-local");
const passport = require("passport");

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (!user) {
          req.flash("error-message", "User not found");
          return done(null, false);
        }
        const checkPassword = bcryptjs.compareSync(password, user.password);
        if (!checkPassword) {
          req.flash("error-message", "Wrong password");
          return done(null, false);
        }
        if (user) {
          req.flash("success-message", "Login Successful");
          return done(null, user);
        }
        return err.message;
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

// Controller for creating a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error-message", "Please fill all fields");
      return res.redirect("back");
    }

    if (password.length < 6) {
      req.flash("error-message", "Password must be at least 6 characters");
      return res.redirect("back");
    }

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      req.flash("error-message", "User already registered");
      return res.redirect("back");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      req.flash("error-message", "An error has occured. Please try again.");
      return res.redirect("back");
    }
    await newUser.save();
    req.flash("success-message", "Registration successfull! Please login");
    return res.redirect("/auth/login");
  } catch {
    ({ message }) => {
      console.log(message);
    };
  }
};

// controller for login action

const loginUser = passport.authenticate("local", {
  successRedirect: "/task/createtask",
  failureRedirect: "/auth/login",
  successFlash: true,
  failureFlash: true,
  passReqToCallback: true,
  session: true,
});

module.exports = {
  registerUser,
  loginUser,
};
