const express = require("express");
const router = express.Router();
const controller = require("../controllers/reflection.controller");
const auth = require("../middlewares/auth");

router.post("/", auth.verify, controller.postReflection);
module.exports = router;
