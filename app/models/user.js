const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  likedSongsIDs: [ObjectId],
  likedGenres: [String],
});

const User = model("User", userSchema);
module.exports = User;
