const express = require("express");
const { handleTurn } = require("../services/turnService");
const router = express.Router();

router.post("/", handleTurn);

module.exports = router;