const { _register, _login, _changeAvatar, _getUserInfo } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const row = await _login(req.body.email.toLowerCase());
    // email
    if (row.length === 0)
      return res.status(404).json({ msg: "email not found" });
    // password
    const match = await bcrypt.compare(req.body.password + "", row[0].password);
    if (!match) return res.status(404).json({ msg: "wrong password" });
    // succesful login
    const userid = row[0].id;
    const email = row[0].email;
    // my secret
    const secret = process.env.ACCESS_TOKEN_SECRET;
    // token
    const accessToken = jwt.sign({ userid, email }, secret, {
      expiresIn: "7d",
    });
    // server cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // response with token
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "somthing went wrong" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await _getUserInfo(id);
    if (data.length === 0) throw new Error(`User not found`);
    res.json(data[0]);
  } catch (err) {
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

const changeAvatar = async (avatar, username, res) => {
  try {
    const row = await _changeAvatar(avatar, username);
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
  getUserInfo
};
