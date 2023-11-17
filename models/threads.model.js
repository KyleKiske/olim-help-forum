const { db } = require("../config/db.js");
const moment = require("moment");

const _create = (category_id, title, body, author_id) => {
    const created_at = moment().utc().format();
    const last_updated = created_at;
    return db("threads")
        .insert({ category_id, title, body, author_id, created_at, last_updated })
        .returning(["id", "title"]);
};
  
const _getThreadById = (id) => {
    return db("threads")
        .select("id", "category_id", "title", "body", "author_id", "created_at")
        .where({ id });
};

const _getThreadsByCategoryIdLimitOrderedByDate = (count) => {
    return db('categories').select('categories.name', "threads.*").leftJoin('threads', 'categories.id', 'threads.category_id')
    .whereIn('threads.id', function () {
        this.select('id').from('threads').whereRaw('threads.category_id = categories.id').orderBy('created_at', "desc").limit(count);
    }).orderBy('threads.created_at', 'desc');
    // return db("threads").select("id", "category_id", "title", "author_id", "created_at").orderBy("created_at", "desc").limit(count);
};

const _getThreadsByCategoryId = (category_id) => {
    return db("threads")
        .select("id", "title", "body", "author_id", "created_at")
        .where({ category_id });
};
  
const _deleteThreadById = (id) => {
    return db("threads").where({id}).del().returning(["id", "title"]);
}

const _getThreadRepliesById = (thread_id) => {
    return db("replies").select("id","author_id","body","created_at").where({thread_id});
}

module.exports = {
    _create,
    _getThreadById,
    _getThreadsByCategoryIdLimitOrderedByDate,
    _getThreadsByCategoryId,
    _deleteThreadById,
    _getThreadRepliesById
};