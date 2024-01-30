const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const songSchema = new Schema({
  songEmbed: String,
  name: String,
  genre: String,
  artistID: ObjectId,
  albumID: ObjectId,
  pictureURL: String,
  releaseDate: Date,
  totalListens: Number,
});

const Song = model("Song", songSchema);
module.exports = Song;
