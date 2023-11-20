const { _create,
        _getThreadById, 
        _getThreadsByCategoryIdLimitOrderedByDate, 
        _getThreadsByCategoryId, 
        _deleteThreadById,
        _getThreadRepliesById } = require("../models/threads.model.js");
require("dotenv").config();

const createThread = async (req, res) => {
    const { category_id, title, body, author_id } = req.body;
    try {
        const row = await _create(category_id, title, body, author_id);
        res.status(201).json({msg: "New thread created"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getThreadById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _getThreadById(id);
        if (data.length === 0) throw new Error(`Thread not found`);
        res.json(data[0]);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getAllThreads = async (req, res) => {
    _getThreadsByCategoryIdLimitOrderedByDate(5)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
}

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

const deleteThreadById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deleteThreadById(id);
        res.json(data);
    }   catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getThreadRepliesById = async (req, res) => {
    const thread_id = req.params;
    try {
        const data = await _getThreadRepliesById(thread_id);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

module.exports = { createThread, getThreadById, getAllThreads, getThreadsByCategoryId, deleteThreadById, getThreadRepliesById };