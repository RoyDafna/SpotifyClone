const { query } = require("express");
const {
  addArtist,
  deleteArtist,
  updateArtist,
  searchByName,
  searchByGenre,
  searchArtistSongs,
  searchArtistAlbums,
} = require("../services/artists.js");

module.exports = {
  addArtist: async (req, res) => {
    try {
      const { name, mainGenre, pictureURL, birthYear, birthMonth, birthDay } = req.body;
      const birthdate = new Date(birthYear, birthMonth - 1, birthDay, 2/*HELP*/);
      const newArtist = await addArtist(name, mainGenre, pictureURL, birthdate);
      res.json(newArtist);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteArtist: async (req, res) => {
    try {
      const artistID = req.params.id;
      const deletedArtist = await deleteArtist(artistID);
      res.json(deletedArtist);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateArtist: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, mainGenre, pictureURL, birthdate } = req.body;
      const artist = await updateArtist(
        id,
        name,
        mainGenre,
        pictureURL,
        birthdate
      );
      res.json(artist);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchArtists: async (req, res) => {
    try {
      let artistsFound;
      let query = { page: 1 };

      if (Object.keys(req.query).length == 0) {
        throw new Error("No query was given");
      } else {
        query = { ...query, ...req.query };

        if (query.hasOwnProperty("name")) {
          artistsFound = await searchByName(query.name, query.page);
        } else if (query.hasOwnProperty("genre")) {
          artistsFound = await searchByGenre(query.genre, query.page);
        }
      }
      res.json(artistsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchArtistContent: async (req, res) => {
    try {
      const artistName = req.params.name;

      if (Object.keys(req.query).length == 0) {
        throw new Error("No query was given");
      } else {
        query = { ...query, ...req.query };

        if (query.hasOwnProperty("songName")) {
          artistsFound = await searchArtistSongs(artistName, query.songName, query.page);
        } else if (query.hasOwnProperty("albumName")) {
          artistsFound = await searchArtistAlbums(artistName, query.albumName, query.page);
        }
      }
      res.json(artistsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
