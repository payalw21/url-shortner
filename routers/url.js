const express = require("express");
const handleGenerateNewShhortURL = require("../controllers/url");
const { model } = require("mongoose");
const router = express.Router();

router.post("/", handleGenerateNewShhortURL);

module.exports = router;
