const controller = require("../controllers/users");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addUser);
router.delete("/:id", cacheNoStore, controller.deleteUser);
router.post("/genre/like/:id", cacheNoStore, controller.likeGenre);
router.post("/song/like/:id", cacheNoStore, controller.likeSong);
router.post("/genre/unlike/:id", cacheNoStore, controller.unlikeGenre);
router.post("/song/unlike/:id", cacheNoStore, controller.unlikeSong);


module.exports = router;
