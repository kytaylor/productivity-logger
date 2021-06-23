const router = require("express").Router();

const savedData = require("../public/scripts/saved-data");

router.post("/tasks", (req, res) => {
    savedData.push(req.body);
    console.log("Saved data:" + savedData)
});

module.exports = router;