const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
