const { query } = require("express");
const {
  addArtist,
  deleteArtist,
  updateArtist,
  searchByName,
  searchByGenre,
  searchArtistSongs,
  searchArtistAlbums,
} = require("../services/artists");

module.exports = {
  addArtist: async (req, res) => {
    try {
      const { name, mainGenre, pictureURL, birthday } = req.body;
      const newArtist = await addArtist(name, mainGenre, pictureURL, birthday);
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
      const { name, mainGenre, pictureURL, birthday } = req.body;
      const artist = await updateArtist(
        id,
        name,
        mainGenre,
        pictureURL,
        birthday
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
      const artistID = req.params.id;

      if (Object.keys(req.query).length == 0) {
        throw new Error("No query was given");
      } else {
        query = { ...query, ...req.query };

        if (query.hasOwnProperty("songName")) {
          artistsFound = await searchArtistSongs(artistID, query.songName, query.page);
        } else if (query.hasOwnProperty("albumName")) {
          artistsFound = await searchArtistAlbums(artistID, query.albumName, query.page);
        }
      }
      res.json(artistsFound);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
