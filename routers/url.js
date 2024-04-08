const express = require("express");
const {
  handleGenerateNewShhortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShhortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
