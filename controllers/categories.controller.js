const { _create, _updateName, _getCategoryById, _getAllCategories, _deleteCategoryById, _getThreadsByCategoryId} = require("../models/categories.model.js");
require("dotenv").config();

const createCategory = async (req, res) => {
    try {
        const row = await _create(req.body.name);
        res.status(201).json({msg: "New category created"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const updateName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const data = await _updateName(id, name);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getAllCategories = async (req, res) => {
    _getAllCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getCategoryById(id);
        if (data.length === 0) throw new Error(`Category not found`);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Category not found" });   
    }
};

const getThreadsByCategoryId = async (req, res) => {
    try {
        const id = req.params.category_id;
        const data = await _getThreadsByCategoryId(id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Category not found" });   
    }
};

const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deleteCategoryById(id);
        res.json(data);
    }   catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

module.exports = { createCategory, updateName, getAllCategories, getCategoryById, deleteCategoryById, getThreadsByCategoryId };