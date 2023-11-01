const { _getCategoryById } = require("../models/categories.model.js");
const { _create, _updateCommentById, _getCommentById, _getCommentsByThreadId, _getCommentsByAuthorId} = require("../models/comments.model.js");
require("dotenv").config();

const createComment = async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    const author_id = 1;
    // try {
    //     const decoded = jwt.verify(token, secret);
    //     user_id = decoded.id;  
    // } catch (error) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
    try {
        const row = await _create(req.body.name);
        res.status(201).json({msg: "New Comment created"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    try {
        const data = await _updateCommentById(id, body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getCommentsByThreadId = async (req, res) => {
    const {thread_id} = req.body;
        _getCommentsByThreadId(thread_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
}

const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getCommentById(id);
        if (data.length === 0) throw new Error(`Comment not found`);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Comment not found" });   
    }
};

const getCommentByAuthorId = async (req, res) => {
    try {
        const author_id = req.params.id;
        const data = await _getCommentsByAuthorId(author_id);
        if (data.length === 0) throw new Error(`Author not found`);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Author not found" });   
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deleteCategoryById(id);
        res.json(data);
    }   catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

module.exports = { createComment, updateComment, getCommentsByThreadId, getCommentById, getCommentByAuthorId };