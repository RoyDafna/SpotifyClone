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
      if (contentType.equals("genre")) {
        await likeGenre(userID, content);
      } else if (contentType.equals("song")) {
        await likeSong(userID, content);
      } else {
        throw new Error("Request body is invalid");
      }

      res.status(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  unlikeContent: async (req, res) => {
    try {
      const { userID, contentType, content } = req.body;
      if (contentType.equals("genre")) {
        await unlikeGenre(userID, content);
      } else if (contentType.equals("song")) {
        await unlikeSong(userID, content);
      } else {
        throw new Error("Request body is invalid");
      }

      res.status(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
