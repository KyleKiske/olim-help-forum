const { db } = require("../config/db.js");

const _create = (name) => {
    return db("categories")
        .insert({ name })
        .returning(["id", "name"]);
};
  
const _updateName = (id, name) => {
    return db("categories")
        .where({id})
        .update({"name" : name}, ["id", "name"]);
};

const _getCategoryById = (id) => {
    return db("categories")
        .select("id", "name")
        .where({ id });
};

const _getAllCategories = () => {
    return db("categories")
        .select("id", "name").orderBy("id");
}

const _deleteCategoryById = (id) => {
    return db("categories").where({id}).del().returning(["id", "name"]);
}
  
module.exports = {
    _create,
    _updateName,
    _getCategoryById,
    _getAllCategories,
    _deleteCategoryById
};