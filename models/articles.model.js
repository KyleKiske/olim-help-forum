const { db } = require("../config/db.js");
const moment = require("moment");

const _create =  (title, body, author_id, main_image) => {
    const created_at = moment().utc().format();
    return db("articles")
        .insert({ title, body, author_id, created_at, main_image })
        .returning(["id", "title", "created_at", "main_image"]);
};
  
const _getArticleById = (id) => {
    return db("articles")
        .select("id", "title", "body", "author_id", "created_at", "main_image", "visible")
        .where({ id });
};

const _getAllVisibleArticles = () => {
    return db("articles")
        .select("id", "title", "body", "created_at", "main_image", "visible").where('visible', true).orderBy("created_at", "desc");
};
  
const _getAllInvisibleArticles = () => {
    return db("articles")
        .select("id", "title", "body", "created_at", "main_image", "visible").where('visible', false).orderBy("created_at", "desc");
};
  
const _changeImage = (main_image, id) => {
    return db("articles")
        .update({ main_image })
        .where({ id })
        .returning(["id", "title", "created_at", "main_image"])
}

const _makeVisible = (id) => {
    return db("articles")
        .update({ "visible": true })
        .where({ id })
        .returning(["id", "title", "created_at", "main_image"]);
}

module.exports = {
    _create,
    _getArticleById,
    _getAllVisibleArticles,
    _getAllInvisibleArticles,
    _changeImage,
    _makeVisible
};