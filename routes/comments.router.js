const { createComment, updateComment, getCommentsByThreadId, getCommentById, getCommentByAuthorId } = require("../controllers/comments.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const comment_router = express.Router();

comment_router.post("/create", createComment);
comment_router.put("/:id", updateComment);
comment_router.get("/:id", getCommentById);
comment_router.get("/author/:id", getCommentByAuthorId);
// comment_router.delete("/:id", deleteCategoryById);
comment_router.get("/thread/:id", getCommentsByThreadId);


module.exports = { comment_router };
