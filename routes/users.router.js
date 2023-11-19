const express = require("express");
const { register, login, getUserInfo, getUserById, getUsersFromThread} = require("../controllers/users.controller.js");
const { verifyToken } = require("../middlewares/verifyToken");
const u_router = express.Router();

u_router.post("/register", register);
u_router.post("/login", login);
u_router.get("/threadReps/:thread_id", getUsersFromThread);
u_router.get("/user/:id", getUserById);
u_router.get("/userinfo", verifyToken, getUserInfo);
u_router.get("/verify", verifyToken, (req, res) => {
  res.sendStatus(200);
});
u_router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.user = null;
  res.sendStatus(200);
});

module.exports = { u_router };
