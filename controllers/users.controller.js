const { _register, _login, _changeAvatar, _getUserInfo, _getUsernameById } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const row = await _login(req.body.email.toLowerCase());
    if (row.length === 0)
      return res.status(404).json({ msg: "email not found" });
    const match = await bcrypt.compare(req.body.password + "", row[0].password);
    if (!match) return res.status(404).json({ msg: "wrong password" });
    const user_id = row[0].id;
    const email = row[0].email;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign({ user_id, email }, secret, {
      expiresIn: "7d",
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "something went wrong" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await _getUserInfo(email);
    if (data.length === 0) throw new Error(`User not found`);
    res.json(data[0]);
  } catch (err) {
    res.status(404).json({ msg: "User not found" });   
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await _getUsernameById(id);
    if (data.length === 0) throw new Error(`User not found`);
    res.json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "User not found" });   
  }
}

const register = async (req, res) => {
  const { email, username, password } = req.body;

  const lower_email = email.toLowerCase();
  const lower_uname = username.toLowerCase();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password + "", salt);

  try {
    const row = await _register(lower_email, lower_uname, hash);
    res.json(row);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: 'email already exist' });
  }
};

const changeAvatar = async (avatar, email, res) => {
  try {
    const row = await _changeAvatar(avatar, email);
    res.json(row);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg : "unexpected error has occurred"});
  }
}

module.exports = {
  register,
  login,
  changeAvatar,
  getUserInfo,
  getUserById
};
