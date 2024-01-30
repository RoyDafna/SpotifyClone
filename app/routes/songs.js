const controller = require("../controllers/songs");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addSong);
router.delete("/:id", cacheNoStore, controller.deleteSong);
router.post("/:id", cacheNoStore, controller.countListen);
router.get("/", cacheNoStore, controller.searchSongs);
/* TODO:
Search by name (paging)
Search by genres (paging)
Search by date range (paging)
*/
router.get("/topTen/", cacheNoStore, controller.getTopTen);

module.exports = router;
