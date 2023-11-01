const { createThread, getAllThreads, getThreadById, getThreadsByCategoryId, deleteThreadById } = require("../controllers/threads.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const t_router = express.Router();

t_router.post("/create", createThread);
t_router.get("/:id", getThreadById);
t_router.get("/category/:id", getThreadsByCategoryId);
t_router.delete("/:id", deleteThreadById);
t_router.get("/", getAllThreads);


module.exports = { t_router };
