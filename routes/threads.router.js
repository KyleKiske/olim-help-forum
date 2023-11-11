const { createThread, getAllThreads, getThreadById, deleteThreadById, getThreadRepliesById } = require("../controllers/threads.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const t_router = express.Router();

t_router.post("/create", createThread);
t_router.get("/:id", getThreadById);
t_router.delete("/:id", deleteThreadById);
t_router.get("/", getAllThreads);
t_router.get("/:id/replies", getThreadRepliesById)


module.exports = { t_router };
