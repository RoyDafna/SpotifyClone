const controller = require("../controllers/users");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.addUser);
router.delete("/:id", cacheNoStore, controller.deleteUser);
router.post("/like/", cacheNoStore, controller.likeContent); // TODO: How to use params and query together
router.post("/unlike/", cacheNoStore, controller.unlikeContent);


module.exports = router;
