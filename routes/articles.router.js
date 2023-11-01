const { publishArticle, getAllArticles, getArticleById } = require("../controllers/articles.controller.js");
const express = require("express");
// const { verifyToken } = require("../middlewares/verify.token.js");
const a_router = express.Router();

a_router.post("/create", publishArticle);
// u_router.get("/verify", verifyToken, (req, res) => {
//   res.sendStatus(200);
// });
a_router.get("/", getAllArticles);
a_router.get("/:id", getArticleById);

module.exports = { a_router };
