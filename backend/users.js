const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  conpassword: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: "https://cdn-icons-png.freepik.com/512/9706/9706583.png",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.conpassword = await bcrypt.hash(this.conpassword, 12);
  }
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("Entered password:", enteredPassword);
  console.log("Stored password:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("Users", UserSchema, "signup");
module.exports = Users;
