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
  likeContent: async (req, res) => {
    try {
      const { userID, contentType, content } = req.body;
      let user;
      if (contentType.equals("genre")) {
        user = await likeGenre(userID, content);
      } else if (contentType.equals("song")) {
        user = await likeSong(userID, content);
      }

      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeContent: async (req, res) => {
    try {
      const { userID, contentType, content } = req.body;
      let user;
      if (contentType.equals("genre")) {
        user = await unlikeGenre(userID, content);
      } else if (contentType.equals("song")) {
        user = await unlikeSong(userID, content);
      }

      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
