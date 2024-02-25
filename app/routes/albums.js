const controller = require("../controllers/albums");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addAlbum);
router.delete("/:id", cacheNoStore, controller.deleteAlbum);
router.get("/", cacheNoStore, controller.searchAlbums);
router.get("/songs/:id", cacheNoStore, controller.searchAlbumSongs);
router.get("/:name", cacheNoStore, controller.searchAlbumByName);
/* TODO:
Search by name (paging)
Search by genres (paging)
Search by date range (paging)
*/


module.exports = router;
