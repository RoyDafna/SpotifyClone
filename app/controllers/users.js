const { query } = require("express");
const {
  addUser,
  deleteUser,
  likeGenre,
  unlikeGenre,
  likeSong,
  unlikeSong,
  getUser,
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
  getUser: async (req, res) => {
    try {
      const { username, password } = req.params;
      const user = await getUser(username, password);
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
  likeSong: async (req, res) => {
    try {
      const { userID, songID } = req.body;
      await likeSong(userID, songID);

      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeSong: async (req, res) => {
    try {
      const { userID, songID } = req.body;
      await unlikeSong(userID, songID);

      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  },
  likeGenre: async (req, res) => {
    try {
      const { userID, genre } = req.body;
      await likeGenre(userID, genre);

      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeGenre: async (req, res) => {
    try {
      const { userID, genre } = req.body;
      await unlikeGenre(userID, genre);

      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
