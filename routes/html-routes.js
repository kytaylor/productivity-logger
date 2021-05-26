const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
});

router.get("/calendar", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/calendar.html"))
});

module.exports = router;