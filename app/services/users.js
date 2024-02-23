const User = require("../models/user");
const PAGE_SIZE = 10;

module.exports = {
  addUser: async (username, password) => {
    const user = await User.find({ username });

    if (user.length == 0) {
      const newUser = new User({
        username,
        password,
        likedSongsIDs: [],
        likedGenres: [],
      });
      return newUser.save();
    } else {
      return null;
    }
  },
  getUser: async (username, password) => {
    return User.find({ username, password });
  },
  deleteUser: async (id) => {
    return User.findByIdAndDelete(id);
  },
  likeGenre: async (userID, genreName) => {
    const userToUpdate = await User.findById(userID);
    userToUpdate.likedGenres.push(genreName);
    return userToUpdate.save();
  },
  likeSong: async (userID, songID) => {
    const userToUpdate = await User.findById(userID);
    userToUpdate.likedSongsIDs.push(songID);
    return userToUpdate.save();
  },
  unlikeGenre: async (userID, genreName) => {
    const userToUpdate = await User.findById(userID);
    userToUpdate.likedGenres = userToUpdate.likedGenres.filter(
      (currGenre) => currGenre != genreName
    );
    return userToUpdate.save();
  },
  unlikeSong: async (userID, songID) => {
    const userToUpdate = await User.findById(userID);
    userToUpdate.likedSongsIDs = userToUpdate.likedSongsIDs.filter(
      (currSong) => currSong != songID
    );
    return userToUpdate.save();
  },
};
