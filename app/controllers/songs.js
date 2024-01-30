const { query } = require("express");
const {
  addSong,
  deleteSong,
  countListen,
  searchByName,
  searchByGenres,
  searchByDateRange,
  getTopTenSongs,
} = require("../services/songs");

module.exports = {
  addSong: async (req, res) => {
    try {
      const { songEmbed, name, genre, artistID, albumID, pictureURL } =
        req.body;
      const newSong = await addSong(
        songEmbed,
        name,
        genre,
        artistID,
        albumID,
        pictureURL
      );
      res.json(newSong);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteSong: async (req, res) => {
    try {
      const songID = req.params.id;
      const deletedSong = await deleteSong(songID);
      res.json(deletedSong);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  countListen: async (req, res) => {
    try {
      const songID = req.params.id;
      const song = await countListen(songID);
      res.json(song);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchSongs: async (req, res) => {
    try {
      let songsFound;
      let query = { page: 1 };

      if (Object.keys(req.query).length == 0) {
        throw new Error("No query was given");
      } else {
        query = { ...query, ...req.query };

        if (query.hasOwnProperty("name")) {
          songsFound = await searchByName(query.name, query.page);
        } else if (query.hasOwnProperty("genres")) {
          songsFound = await searchByGenres(query.genres, query.page);
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
      res.json(songsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getTopTen: async (req, res) => {
    try {
      const topTenSongs = await getTopTenSongs(songID);
      res.json(topTenSongs);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
