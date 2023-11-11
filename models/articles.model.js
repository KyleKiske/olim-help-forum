const { db } = require("../config/db.js");
const moment = require("moment");

const _create =  (title, body, author_id, main_image) => {
    const created_at = moment().utc().format();
    console.log(created_at);
    return db("articles")
        .insert({ title, body, author_id, created_at, main_image })
        .returning(["id", "title", "created_at", "main_image"]);
};
  
const _getArticleById = (id) => {
    return db("articles")
        .select("id", "title", "body", "author_id", "created_at", "main_image")
        .where({ id });
};

const _getAllArticles = () => {
    return db("articles")
        .select("id", "title", "body", "created_at", "main_image").orderBy("created_at", "asc");
};
  
module.exports = {
    _create,
    _getArticleById,
    _getAllArticles
};