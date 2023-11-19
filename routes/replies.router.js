const { createReply, updateReply, getRepliesByThreadId, getReplyById, getRepliesByAuthorId } = require("../controllers/replies.controller.js");
const express = require("express");
const r_router = express.Router();

r_router.post("/create", createReply);
r_router.put("/:id", updateReply);
r_router.get("/:id", getReplyById);
r_router.get("/author/:id", getRepliesByAuthorId);
r_router.get("/thread/:thread_id", getRepliesByThreadId);

module.exports = { r_router };