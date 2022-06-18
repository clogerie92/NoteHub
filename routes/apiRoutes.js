const router = require("express").Router();
const fs = require("fs");
let dbNotes = require("../db/db.json");

router.get("/api/notes", (req, res) => {
    dbNotes = JSON.parse(fs.readFileSync("db/db.json"))
    res.json(dbNotes);
});
router.post("/api/notes", (req, res) => {
    const usersNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 99)
    }
    dbNotes.push(usersNote);
    fs.writeFileSync("db/db.json", JSON.stringify(dbNotes), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(dbNotes);
});
router.delete("/api/notes/:id", (req, res) => {
    const newNotes = [];
    for (let i = 0; i < dbNotes.length; i++) {
        if (dbNotes[i].id !=req.params.id) {
            newNotes.push(dbNotes[i]);
        }
    }
    dbNotes = newNotes;
    fs.writeFileSync("db/db.json", JSON.stringify(dbNotes), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(dbNotes);
});

module.exports = router;
