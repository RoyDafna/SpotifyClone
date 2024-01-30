const controller = require("../controllers/users");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addUser);
router.delete("/:id", cacheNoStore, controller.deleteUser);
router.post("/genre/like/:userID/genreName:", cacheNoStore, controller.likeGenre);
router.post("/song/like/:userID/songID", cacheNoStore, controller.likeSong);
router.post("/genre/unlike/:userID/genreName", cacheNoStore, controller.unlikeGenre);
router.post("/song/unlike/:userID/songID", cacheNoStore, controller.unlikeSong);


module.exports = router;
