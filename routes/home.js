const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

router.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.com/bluuweb1", shortURL: "Tarjeta #1"},
        {origin: "www.google.com/bluuweb2", shortURL: "Tarjeta #2"},
        {origin: "www.google.com/bluuweb3", shortURL: "Tarjeta #3"},
        {origin: "www.google.com/bluuweb1", shortURL: "Tarjeta #4"},
        {origin: "www.google.com/bluuweb2", shortURL: "Tarjeta #5"},
        {origin: "www.google.com/bluuweb3", shortURL: "Tarjeta #6"}
    ];
    res.render("home", {urls:urls});
})



module.exports = router

