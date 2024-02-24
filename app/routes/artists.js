const controller = require("../controllers/artists");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addArtist);
router.delete("/:id", cacheNoStore, controller.deleteArtist);
router.post("/:id", cacheNoStore, controller.updateArtist);
router.get("/", cacheNoStore, controller.searchArtists);
/* TODO:
Search by name (paging)
Search by genres (paging)
*/
router.get("content/:name/:songName", cacheNoStore, controller.searchArtistContent);
/* TODO:
Search songs (paging)
Search albums (paging)
*/
router.get("/songs/:id", cacheNoStore, controller.searchArtistSongs);

module.exports = router;
