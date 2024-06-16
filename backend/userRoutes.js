const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const app = express.Router();

app.route("/register").post(registerUser);

app.route("/login").post(loginUser);

module.exports = app;
