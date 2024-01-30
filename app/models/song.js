const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const songSchema = new Schema({
  songEmbed: String,
  name: String,
  genre: { type: String, index: true },
  artistID: String, //CHANGE
  albumID: String, //CHANGE
  pictureURL: String,
  releaseDate: Date,
  totalListens: {type: Number, index: true},
});

songSchema.index({ name: "text" });
const Song = model("Song", songSchema);
module.exports = Song;
