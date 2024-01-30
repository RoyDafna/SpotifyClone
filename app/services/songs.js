const Song = require("../models/song");

module.exports = {
  addSong: async (songEmbed, name, genre, artistID, albumID, pictureURL) => {
    const newSong = new Song({
      songEmbed,
      name,
      genre,
      artistID,
      albumID,
      pictureURL,
      releaseDate: Date.now(),
      totalListens: 0,
    });
    return newSong.save();
  },
  deleteSong: async (id) => {
    return Song.findByIdAndDelete(id);
  },
  countListen: async (id) => {
    const songToUpdate = await Song.findById(id).exec();
    songToUpdate.totalListens++;
    return
  },
};
