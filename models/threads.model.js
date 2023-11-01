const { db } = require("../config/db.js");
const moment = require("moment");

const _create = (category_id, title, body, author_id) => {
    const created_at = moment().utc().format();
    console.log(created_at);
    return db("threads")
        .insert({ category_id, title, body, author_id, created_at })
        .returning(["id", "title"]);
};
  
const _getThreadById = (id) => {
    return db("threads")
        .select("id", "category_id", "title", "body", "author_id", "created_at")
        .where({ id });
};

const _getAllThreads = () => {
    return db("threads").select("id", "category_id", "title", "author_id", "created_at");
};

const _getThreadsByCategoryId = (category_id) => {
    return db("threads")
        .select("id", "title", "body", "author_id", "created_at")
        .where({ category_id });
};
  
const _deleteThreadById = (id) => {
    return db("threads").where({id}).del().returning(["id", "title"]);
}

module.exports = {
    _create,
    _getThreadById,
    _getAllThreads,
    _getThreadsByCategoryId,
    _deleteThreadById
};