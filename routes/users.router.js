const { register, login, getUserInfo } = require("../controllers/users.controller.js");
const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken.js");
const u_router = express.Router();

u_router.post("/register", register);
u_router.post("/login", login);
u_router.post("/:id", getUserInfo);
u_router.get("/verify", verifyToken, (req, res) => {
  res.sendStatus(200);
});
u_router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.user = null;
  res.sendStatus(200);
});

module.exports = { u_router };
