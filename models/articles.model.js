const { db } = require("../config/db.js");
const moment = require("moment");

const _create =  (title, body, author_id) => {
    const created_at = moment().utc().format();
    console.log(created_at);
    return db("articles")
        .insert({ title, body, author_id, created_at })
        .returning(["id", "title", "created_at"]);
};
  
const _getArticleById = (id) => {
    return db("articles")
        .select("id", "title", "body", "author_id", "created_at")
        .where({ id });
};

const _getAllArticles = () => {
    return db("articles")
        .select("id", "title", "author_id", "created_at").orderBy("created_at", "asc");
};
  
module.exports = {
    _create,
    _getArticleById,
    _getAllArticles
};