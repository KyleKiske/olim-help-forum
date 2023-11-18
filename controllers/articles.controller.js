const { _create, _getAllVisibleArticles, _getAllInvisibleArticles, _getArticleById, _changeImage, _makeVisible, _deleteArticleById } = require("../models/articles.model.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.ACCESS_TOKEN_SECRET;

const publishArticle = async (req, res) => {
    try {
        const row = await _create(req.body.title, req.body.body, req.body.author_id, req.body.main_image);
        res.status(201).json({msg: "New article created"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getAllVisibleArticles = async (req, res) => {
    _getAllVisibleArticles()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
}

const getAllInvisibleArticles = async (req, res) => {
  _getAllInvisibleArticles()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(404).json({ msg: "not found" });
  });
}

const getArticleById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getArticleById(id);
        if (data.length === 0) throw new Error(`Article not found`);
        res.json(data[0]);
    } catch (err) {
        res.status(404).json({ msg: "Article not found" });   
    }
};

const changeImage = async (main_image, article_id, res) => {
  try {
    const row = await _changeImage(main_image, article_id);
    res.json(row);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg : "unexpected error has occurred"});
  }
}

const makeVisible = async (req, res) => {
  try {
    const id = req.params.id;
    const row = await _makeVisible(id);
    res.json(row);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg : "unexpected error has occurred"});
  }
}

const deleteArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const row = await _deleteArticleById(id);
    res.json(row);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg : "unexpected error has occurred"});
  }
}

module.exports = { publishArticle, getAllVisibleArticles, getAllInvisibleArticles, getArticleById, changeImage, makeVisible, deleteArticleById };