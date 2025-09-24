const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.post("/", (req, res) => {
    const sessionId = uuidv4();
    res.json({ sessionId });
});

module.exports = router;