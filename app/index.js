const bodyParser = require("body-parser");
const express = require("express");
const songsRouter = require("./routes/songs");
const artistsRouter = require("./routes/artists");
const albumsRouter = require("./routes/albums");
const usersRouter = require("./routes/users");

const app = express();
app.use(bodyParser.json());
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/users", usersRouter);


module.exports = app;
