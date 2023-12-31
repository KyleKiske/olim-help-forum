const { createCategory, updateName, deleteCategoryById, getAllCategories, getCategoryById, getThreadsByCategoryId } = require("../controllers/categories.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const c_router = express.Router();

c_router.post("/create", createCategory);
c_router.put("/:id", updateName);
c_router.get("/:id", getCategoryById);
c_router.delete("/:id", deleteCategoryById);
c_router.get("/", getAllCategories);
c_router.get("/:id/threads", getThreadsByCategoryId);

module.exports = { c_router };
