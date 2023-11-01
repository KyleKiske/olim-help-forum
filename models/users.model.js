const { db } = require("../config/db.js");
const moment = require("moment");

const _register = (email, username, password) => {
    const created_at = moment().utc().format();
    console.log(created_at);
    return db("users")
        .insert({ email, username, password, created_at })
        .returning(["id", "email"]);
};
  
const _login = (email) => {
    return db("users")
        .select("id", "email", "password")
        .where({ email });
};
  
module.exports = {
    _register,
    _login
};