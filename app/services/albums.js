const Album = require("../models/album");
const PAGE_SIZE = 10;

module.exports = {
  addAlbum: async (name, genre, artistID, pictureURL, songIDs) => {
    const newAlbum = new Album({
      name,
      genre,
      artistID,
      pictureURL,
      releaseDate: Date.now(),
      songIDs,
    });
    return newAlbum.save();
  },
  deleteAlbum: async (id) => {
    return Album.findByIdAndDelete(id);
  },
  searchByName: async (name, page) => {
    const albums = await Album.find({ $text: { $search: name } })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
  searchByGenre: async (genre, page) => {
    const albums = await Album.find({ genre: genre })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
  searchByDateRange: async (startDate, endDate, page) => {
    const albums = await Album.find({
      releaseDate: { $gte: startDate, $lte: endDate },
    })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
};
