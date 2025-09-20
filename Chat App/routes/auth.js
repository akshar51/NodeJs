const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register
router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.redirect("/login");
});

// Login
router.get("/login", (req, res) => res.render("login"));
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Invalid credentials");
  req.session.user = user;
  res.redirect("/chat");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
