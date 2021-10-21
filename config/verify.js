const verify = async (req, res, next) => {
  if (!req.user) {
    req.flash("error-message", "You have to be logged in.");
    res.redirect("/auth/login");
  }
  next();
};

module.exports = verify;
