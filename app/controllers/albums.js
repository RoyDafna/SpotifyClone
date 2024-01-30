const { query } = require("express");
const {
  addAlbum,
  deleteAlbum,
  searchByName,
  searchByGenres,
  searchByDateRange,
} = require("../services/albums");

module.exports = {
  addAlbum: async (req, res) => {
    try {
      const { name, genre, artistID, pictureURL, songIDs } = req.body;
      const newAlbum = await addAlbum(
        name,
        genre,
        artistID,
        pictureURL,
        songIDs
      );
      res.json(newAlbum);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteAlbum: async (req, res) => {
    try {
      const albumID = req.params.id;
      const deletedAlbum = await deleteAlbum(albumID);
      res.json(deletedAlbum);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchAlbums: async (req, res) => {
    try {
      let albumsFound;
      let query = { page: 1 };

      if (Object.keys(req.query).length == 0) {
        throw new Error("No query was given");
      } else {
        query = { ...query, ...req.query };

        if (query.hasOwnProperty("name")) {
          albumsFound = await searchByName(query.name, query.page);
        } else if (query.hasOwnProperty("genres")) {
          albumsFound = await searchByGenres(query.genres, query.page);
        } else if (
          query.hasOwnProperty("startDate") &&
          query.hasOwnProperty("endDate")
        ) {
          songsFound = await searchByDateRange(
            query.startDate,
            query.endDate,
            query.page
          );
        }
      }
      res.json(albumsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
