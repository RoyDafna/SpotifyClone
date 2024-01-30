const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const albumSchema = new Schema({
  name: String,
  genre: String,
  artistID: ObjectId,
  pictureURL: String,
  releaseDate: Date,
  songIDs: [ObjectId],
});

const Album = model("Album", albumSchema);
module.exports = Album;
