const Album = require("../models/album");
const mongoose = require("mongoose");
const PAGE_SIZE = 10;

module.exports = {
  getTopTenAlbums: async () => {
    const albums = await Album.aggregate([
      {
        $unwind: {
          path: "$songIDs",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "songIDs",
          foreignField: "_id",
          as: "songDetails",
        },
      },
      {
        $unwind: {
          path: "$songDetails",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$songDetails", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          songDetails: 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          genre: {
            $first: "$genre",
          },
          artistID: {
            $first: "$artistID",
          },
          pictureURL: {
            $first: "$pictureURL",
          },
          releaseDate: {
            $first: "$releaseDate",
          },
          songIDs: {
            $push: "$songIDs",
          },
          totalListens: {
            $sum: "$totalListens",
          },
        },
      },
      {
        $sort: {
          totalListens: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    return albums;
  },
  searchAlbumSongs: async (albumID) => {
    const albumSongs = await Album.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(albumID),
        },
      },
      {
        $unwind: {
          path: "$songIDs",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "songIDs",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: {
          path: "$song",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          song: 1,
          _id: 0,
        },
      },
    ]);
    return albumSongs;
  },

  searchAlbumByName: async (name) => {
    const albumSongs = await Album.find({ $text: { $search: name } });
    return albumSongs;
  },

  addAlbum: async (name, genre, artistID, pictureURL, songIDs) => {
    const newAlbum = new Album({
      name,
      genre,
      artistID,
      pictureURL,
      releaseDate: Date.now(),
      songIDs,
    });
    return newAlbum.save();
  },
  deleteAlbum: async (id) => {
    return Album.findByIdAndDelete(id);
  },
  searchByName: async (name, page) => {
    const albums = await Album.find({ $text: { $search: name } })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
  searchByGenre: async (genre, page) => {
    const albums = await Album.find({ genre: genre })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
  searchByDateRange: async (startDate, endDate, page) => {
    const albums = await Album.find({
      releaseDate: { $gte: startDate, $lte: endDate },
    })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);
    return albums;
  },
};
