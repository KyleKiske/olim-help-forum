const { db } = require("../config/db.js");
const moment = require("moment");

const _create = (author_id, thread_id, body) => {
    const created_at = moment().utc().format();
    console.log(created_at);
    return db("comments")
        .insert({ author_id, thread_id, body, created_at })
        .returning(["id", "body", "created_at"]);
};

const _updateCommentById = (id, newBody) => {
    return db("comments")
        .where({id})
        .update({"body" : newBody}, ["id", "body"]);
}

const _getCommentById = (id) => {
    return db("comments")
        .select("id", "thread_id", "author_id", "body", "created_at")
        .where({ id });
};

const _getCommentsByThreadId = (thread_id) => {
    return db("comments")
        .select("title", "author_id",  "body", "created_at")
        .where({ thread_id })
        .orderBy(created_at, "asc");
};
  
const _getCommentsByAuthorId = (author_id) => {
    return db("comments")
        .select("title", "thread_id", "body", "created_at")
        .where({ author_id })
        .orderBy(created_at, "asc");
};

module.exports = {
    _create,
    _updateCommentById,
    _getCommentById,
    _getCommentsByThreadId,
    _getCommentsByAuthorId
};