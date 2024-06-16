const asyncHandler = require("express-async-handler");
const Users = require("../models/users");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, conpassword } = req.body;

  if (!username || !email || !password || !conpassword) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  const userExists = await Users.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = new Users({ username, email, password, conpassword });

  if (newUser) {
    await newUser.save();
    res.status(200).json({ message: "User added" });
  } else {
    res.status(500).json({ error: "Error adding user" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});
module.exports = { registerUser, loginUser };
