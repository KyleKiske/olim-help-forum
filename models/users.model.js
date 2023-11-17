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
        .select("id", "username", "email", "avatar")
        .where({ email });
}

const _getUsernameById = (id) => {
    return db("users")
        .select("username")
        .where({ id });
}


const _changeAvatar = (avatar, email) => {
    return db("users")
        .update({ avatar })
        .where({ email })
        .returning(["id", "username", "email", "avatar"])
}
  
module.exports = {
    _register,
    _login,
    _changeAvatar,
    _getUserInfo,
    _getUsernameById
};