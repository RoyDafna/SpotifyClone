const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: String,
  mainGenre: String,
  pictureURL: String,
  birthday: Date,
});

const Artist = model("Artist", artistSchema);
module.exports = Artist;
