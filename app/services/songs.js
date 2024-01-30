const Song = require("../models/song");
const PAGE_SIZE = 10;

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
    return songToUpdate.save();
  },
  searchByName: async (name, page) => {
    const songs = await Song.find({ $text: { $search: name } })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return songs;
  },
  searchByGenre: async (genre, page) => {
    const songs = await Song.find({ genre: genre })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return songs;
  },
  searchByDateRange: async (startDate, endDate, page) => {
    const songs = Song.find({
      releaseDate: { $gte: startDate, $lte: endDate },
    })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return songs;
  },
  getTopTenSongs: async () => {
    return Song.find().sort({ totalListens: -1 }).limit(10);
  },
};
