const controller = require("../controllers/albums");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addAlbum);
router.delete("/:id", cacheNoStore, controller.deleteAlbum);
router.get("/", cacheNoStore, controller.searchAlbums);
router.get("/songs/:id", cacheNoStore, controller.searchAlbumSongs);
router.get("/name/:name", cacheNoStore, controller.searchAlbumByName);
router.get("/topTen", cacheNoStore, controller.getTopTenAlbums);

module.exports = router;
