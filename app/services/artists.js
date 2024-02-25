const mongoose = require("mongoose");
const Artist = require("../models/artist");
const Song = require("../models/song");
const PAGE_SIZE = 10;

module.exports = {
  getArtistByID: async (id) => {
    const artist = await Artist.findById(id);
    return artist;
  },

  addArtist: async (name, mainGenre, pictureURL, birthdate) => {
    const newArtist = new Artist({
      name,
      mainGenre,
      pictureURL,
      birthdate,
    });
    return newArtist.save();
  },
  searchArtistSongs: async (id) => {
    const artistSongs = await Song.find({
      artistID: new mongoose.Types.ObjectId(id),
    });
    return artistSongs;
  },
  updateArtist: async (id, name, mainGenre, pictureURL, birthdate) => {
    const artistToUpdate = await Artist.findById(id);
    artistToUpdate.name = name;
    artistToUpdate.mainGenre = mainGenre;
    artistToUpdate.pictureURL = pictureURL;
    artistToUpdate.birthdate = birthdate;

    return artistToUpdate.save();
  },
  deleteArtist: async (id) => {
    return Artist.findByIdAndDelete(id);
  },
  searchByName: async (name, page) => {
    const artists = await Artist.find({ $text: { $search: name } })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return artists;
  },
  searchByGenre: async (genre, page) => {
    const artists = await Artist.find({ mainGenre: genre })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return artists;
  },
  searchArtistContent: async (artistName, songName) => {
    const songs = await Song.aggregate([
      {
        $match: {
          $text: {
            $search: songName,
          },
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "artistID",
          foreignField: "_id",
          as: "connectedArtist",
        },
      },
      {
        $match: {
          "connectedArtist.0.name": artistName,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          songEmbed: 1,
          genre: 1,
          artistID: 1,
          pictureURL: 1,
          releaseDate: 1,
          totalListens: 1,
        },
      },
    ]);
    return songs;
  },
};
