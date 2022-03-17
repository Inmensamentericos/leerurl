const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();


router.get("/login", (req, res) => {
    res.render("login")
});

module.exports = router