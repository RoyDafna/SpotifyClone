const controller = require("../controllers/users");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addUser);
router.get("/", cacheNoStore, controller.getUser);
router.delete("/:id", cacheNoStore, controller.deleteUser);
router.get("/likedSongs/:id", cacheNoStore, controller.getLikedSongs);
router.post("/likeSong/", cacheNoStore, controller.likeSong);
router.post("/likeGenre/", cacheNoStore, controller.likeGenre);
router.post("/unlikeSong/", cacheNoStore, controller.unlikeSong);
router.post("/unlikeGenre/", cacheNoStore, controller.unlikeGenre);


module.exports = router;
