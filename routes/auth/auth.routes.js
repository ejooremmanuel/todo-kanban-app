const router = require("express").Router();
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth/auth.controller");

// Login Route
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", loginUser);

// Register route
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", registerUser);

module.exports = router;
