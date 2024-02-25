const { query } = require("express");
const {
  addArtist,
  deleteArtist,
  updateArtist,
  searchByName,
  searchByGenre,
  searchArtistContent,
  searchArtistSongs,
  getArtistByID,
} = require("../services/artists.js");

module.exports = {
  getArtistByID: async (req, res) => {
    try {
      const id = req.params.id;
      const artist = await getArtistByID(id);
      res.json(artist);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchArtistSongs: async (req, res) => {
    try {
      const id = req.params.id;
      const artistSongs = await searchArtistSongs(id);
      res.json(artistSongs);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addArtist: async (req, res) => {
    try {
      const { name, mainGenre, pictureURL, birthYear, birthMonth, birthDay } =
        req.body;
      const birthdate = new Date(
        birthYear,
        birthMonth - 1,
        birthDay,
        2 /*HELP*/
      );
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
      const songName = req.params.songName;

      artistsFound = await searchArtistContent(artistName, songName);
      res.json(artistsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
