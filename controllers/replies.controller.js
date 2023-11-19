const { _getCategoryById } = require("../models/categories.model.js");
const { _create, _updateReplyById, _getReplyById, _getRepliesByThreadId, _getRepliesByAuthorId} = require("../models/replies.model.js");
require("dotenv").config();

const createReply = async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    const { author_id, thread_id, body } = req.body;
    // try {
    //     const decoded = jwt.verify(token, secret);
    //     user_id = decoded.id;  
    // } catch (error) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
    try {
        const row = await _create(author_id, thread_id, body);
        res.status(201).json({msg: "New Reply added"});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const updateReply = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    try {
        const data = await _updateReplyById(id, body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}

const getRepliesByThreadId = async (req, res) => {
    try {
        const thread_id = req.params.thread_id;
        const data = await _getRepliesByThreadId(thread_id)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "not found" });
    }
}

const getReplyById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getReplyById(id);
        if (data.length === 0) throw new Error(`Comment not found`);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Comment not found" });   
    }
};

const getRepliesByAuthorId = async (req, res) => {
    try {
        const author_id = req.params.id;
        const data = await _getRepliesByAuthorId(author_id);
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

module.exports = { createReply, updateReply, getRepliesByThreadId, getReplyById, getRepliesByAuthorId };