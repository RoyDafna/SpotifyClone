const bodyParser = require("body-parser");
const express = require("express");
const songsRouter = require("./routes/songs");
const artistsRouter = require("./routes/artists");
const albumsRouter = require("./routes/albums");

const app = express();
app.use(bodyParser.json());
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/albums", albumsRouter);

module.exports = app;
