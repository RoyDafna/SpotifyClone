const controller = require("../controllers/artists");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addArtist);
router.delete("/:id", cacheNoStore, controller.deleteArtist);
router.post("/:id", cacheNoStore, controller.updateArtist);
router.get("/", cacheNoStore, controller.searchArtists);
router.get("/:id", cacheNoStore, controller.getArtistByID);
router.get("content/:name/:songName", cacheNoStore, controller.searchArtistContent);
router.get("/songs/:id", cacheNoStore, controller.searchArtistSongs);

module.exports = router;
