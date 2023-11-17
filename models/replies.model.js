const { db } = require("../config/db.js");
const moment = require("moment");

const _create = (author_id, thread_id, body) => {
    const created_at = moment().utc().format();
    return db("replies")
        .insert({ author_id, thread_id, body, created_at })
        .returning(["id", "body", "created_at"]);
};

const _updateReplyById = (id, newBody) => {
    return db("replies")
        .where({id})``
        .update({"body" : newBody}, ["id", "body"]);
}

const _getReplyById = (id) => {
    return db("replies")
        .select("id", "thread_id", "author_id", "body", "created_at")
        .where({ id });
};

const _getRepliesByThreadId = (thread_id) => {
    return db("replies")
        .select("title", "author_id",  "body", "created_at")
        .where({ thread_id })
        .orderBy(created_at, "asc");
};
  
const _getRepliesByAuthorId = (author_id) => {
    return db("replies")
        .select("title", "thread_id", "body", "created_at")
        .where({ author_id })
        .orderBy(created_at, "asc");
};

module.exports = {
    _create,
    _updateReplyById,
    _getReplyById,
    _getRepliesByThreadId,
    _getRepliesByAuthorId
};