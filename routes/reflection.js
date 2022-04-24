const express = require("express");
const router = express.Router();
const controller = require("../controllers/reflection.controller");
const auth = require("../middlewares/auth");
const reflection = require("../middlewares/reflection");

router.post(
  "/",
  auth.verify,
  reflection.validatePostReflection,
  controller.postReflection
);
router.get("/", auth.verify, controller.getReflection);
router.put(
  "/:id",
  auth.verify,
  reflection.validatePutReflection,
  controller.updateReflection
);
router.delete("/:id", auth.verify, controller.deleteReflection);

module.exports = router;
