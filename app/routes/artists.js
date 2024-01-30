const controller = require("../controllers/artists");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addArtist);
router.delete("/:id", cacheNoStore, controller.deleteArtist);
router.post("/:id", cacheNoStore, controller.updateGenre);
router.post("/:id", cacheNoStore, controller.updatePicture);
router.get("/", cacheNoStore, controller.searchArtists);
/* TODO:
Search by name (paging)
Search by genres (paging)
*/
router.get("/:id", cacheNoStore, controller.searchArtistContent);
/* TODO:
Search songs (paging)
Search albums (paging)
*/

module.exports = router;
