const { _create, _getAllArticles, _getArticleById} = require("../models/articles.model.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.ACCESS_TOKEN_SECRET;

const publishArticle = async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    // try {
    //     const decoded = jwt.verify(token, secret);
    //     user_id = decoded.id;  
    // } catch (error) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
    try {
        const row = await _create(req.body.title, req.body.body, 1, req.body.main_image);
        res.status(201).json({msg: "New article created"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getAllArticles = async (req, res) => {
    _getAllArticles()
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

module.exports = { publishArticle, getAllArticles, getArticleById };