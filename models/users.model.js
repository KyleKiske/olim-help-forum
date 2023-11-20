const { db } = require("../config/db.js");
const moment = require("moment");

const _register = (email, username, password) => {
    const created_at = moment().utc().format();
    return db("users")
        .insert({ email, username, password, created_at })
        .returning(["id", "email"]);
};
  
const _login = (email) => {
    return db("users")
        .select("id", "email", "password")
        .where({ email });
};

const _getUserInfo = (email) => {
    return db("users")
        .select("id", "username", "email", "avatar", "superuser")
        .where({ email });
}

const _getUserById = (id) => {
    return db("users")
        .select("id", "username", "email", "avatar")
        .where({ id });
}

const _changeAvatar = (avatar, email) => {
    return db("users")
        .update({ avatar })
        .where({ email })
        .returning(["id", "username", "email", "avatar"])
}

const _getUsersFromThread = (thread_id) => {
    return db('users')
        .select('users.id', 'users.username', 'users.avatar')
        .join('replies', 'replies.author_id', '=', 'users.id')
        .where('replies.thread_id', '=', thread_id)
}
  
module.exports = {
    _register,
    _login,
    _changeAvatar,
    _getUserById,
    _getUserInfo,
    _getUsersFromThread
};