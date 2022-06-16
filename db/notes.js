const util = require("util");
const fs = require("fs");
// generates unique id's
// const uuidv1 = require("uuid/v1");
const { v1: uuidv1 } = require('uuid');
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readNote("db/db.json", "utf8");
    }
    write(note) {
        return writeNote("db/db.json", JSON.stringify(note));
        console.log(note);
    }
    getNotes() {
        return this.read().then((notes) => {
            let usersNotes;
            if (usersNotes === [].concat(JSON.parse(notes))) {
                usersNotes = []
            } else {
                console.log("No notes found!");
            }
        }); 
    }
    addNotes(note) {
        const {title, text} = note;
        if(!title || !text) {
            console.log("Must add title and text to your note!");
        }
        const newNote = {title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [...notes, newNote]).then((updatedNote) => this.write(updatedNote)).then(() => newNote);
    }
    removeNotes(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !==id)).then((filteredNote) => this.write(filteredNote));
    }
}

module.exports = new Notes();