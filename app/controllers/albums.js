const { query } = require("express");
const {
  addAlbum,
  deleteAlbum,
  searchByName,
  searchByGenre,
  searchByDateRange,
  searchAlbumSongs,
  searchAlbumByName,
  getTopTenAlbums,
} = require("../services/albums");

module.exports = {
  getTopTenAlbums: async (req, res) => {
    try {
      const albums = await getTopTenAlbums();
      res.json(albums);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchAlbumByName: async (req, res) => {
    try {
      const name = req.params.name;
      const albums = await searchAlbumByName(name);
      res.json(albums);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchAlbumSongs: async (req, res) => {
    try {
      const id = req.params.id;
      const albumSongs = await searchAlbumSongs(id);
      res.json(albumSongs);
    } catch (err) {
      res.status(500).send(err);
    }
  },

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
        } else if (query.hasOwnProperty("genre")) {
          albumsFound = await searchByGenre(query.genre, query.page);
        } else if (
          query.hasOwnProperty("startDate") &&
          query.hasOwnProperty("endDate")
        ) {
          albumsFound = await searchByDateRange(
            new Date(Number(query.startDate)),
            new Date(Number(query.endDate)),
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
