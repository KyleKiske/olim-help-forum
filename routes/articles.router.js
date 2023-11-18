const { publishArticle, getAllVisibleArticles, getAllInvisibleArticles, getArticleById, makeVisible } = require("../controllers/articles.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const a_router = express.Router();

a_router.post("/create", publishArticle);
a_router.get("/", getAllVisibleArticles);
a_router.get("/invis", getAllInvisibleArticles);
a_router.get("/:id", getArticleById);
a_router.patch('/visible/:id', makeVisible);

module.exports = { a_router };
