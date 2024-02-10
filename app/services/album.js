const Artist = require("../models/artist");
const { aggregate } = require("../models/song");
const PAGE_SIZE = 10;

module.exports = {
  addArtist: async (name, mainGenre, pictureURL, birthdate) => {
    const newArtist = new Artist({
      name,
      mainGenre,
      pictureURL,
      birthdate,
    });
    return newArtist.save();
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
  searchArtistSongs: async (artistName, songName, page) => {
    const songs = await Artist.aggregate([
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
    ])
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);

    return songs;
  },
  searchArtistAlbums: async (artistName, albumName, page) => {},
};
