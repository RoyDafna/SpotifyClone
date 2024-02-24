const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: String,
  mainGenre: String,
  pictureURL: String,
  birthdate: Date,
});

artistSchema.index({ name: "text" });
const Artist = model("Artist", artistSchema);
module.exports = Artist;
