const { query } = require("express");
const {
  addUser,
  deleteUser,
  likeGenre,
  unlikeGenre,
  likeSong,
  unlikeSong,
} = require("../services/users");

module.exports = {
  addUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = await addUser(username, password);
      res.json(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const deletedUser = await deleteUser(userID);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  likeGenre: async (req, res) => {
    try {
      const userID = req.params.userID;
      const genreName = req.params.genreName;
      const user = await likeGenre(userID, genreName);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  likeSong: async (req, res) => {
    try {
      const userID = req.params.userID;
      const songID = req.params.songID;
      const user = await likeSong(userID, songID);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeGenre: async (req, res) => {
    try {
      const userID = req.params.userID;
      const genreName = req.params.genreName;
      const user = await unlikeGenre(userID, genreName);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeSong: async (req, res) => {
    try {
      const userID = req.params.userID;
      const songID = req.params.songID;
      const user = await unlikeSong(userID, songID);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
