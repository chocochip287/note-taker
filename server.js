/*
1/24/23
To Do:
* MVP achieved.

Future scoping:
* Maybe some style stuff? This one is pretty open and shut since the front end was pre-written.
* I want to know why my console.log at the end of the POST route isn't working when the one in my DELETE route is. Not important for MVP but I'm curious/annoyed.

*/

// Initialization/node stuff
const express = require("express");
const path = require("path");
const data = require("./Develop/db/db.json");
// Port number
const PORT = 6505;
const fs = require("fs");
// generates unique ID values
const uniqid = require("uniqid");

// Web server object
const app = express();

// Middleware

// Setup for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./Develop/public"));

// Variable to allow manipulation of db.json for the delete and post routes.

let shadowData = data;

// Routes

// Loads the homepage, index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});

// Loads notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
});

// GET route for db.json

app.get("/api/notes", (req, res) => {
    res.json(shadowData);
})

// Note POST route
app.post("/api/notes", (req, res) => {
    // Constructor for the new note
    function NewNote(id, title, text) {
        this.id = id,
        this.title = title,
        this.text = text
    };

    // Variable to hold the new note
    let thisNote = new NewNote(uniqid.process(), req.body.title, req.body.text)
    // Pushes the note to db.json
    shadowData.push(thisNote);
    // Updates the db file to include the new note.
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(shadowData), (err) => {
        err ? console.error(err) : console.log(`New note added to the DB.`);
    });

    res.json(data);
});

// Note DELETE route
app.delete("/api/notes/:id", (req, res) => {
    // Holds the ID variable to find the related index in the notes db
    const thisID = req.params.id;
    // Captures the index of the matching variable from the notes db
    const deleteMe = shadowData.find(note => note.id === thisID);

    if (deleteMe) {
        shadowData = shadowData.filter(notes => notes.id != thisID);
    } else {
        // this should never happen since the ID will always come from an existing entry but.. who knows.
        res.status(500).json({ message: "Something went wrong."});
    }

    // updates the db file to reflect the note deletion.
    fs.writeFile("./Develop/db/db.json", JSON.stringify(shadowData), (err) =>{
        err ? console.error(err) : console.log(`Note was removed from the DB.`);
    })

    res.json(data);
});

// Listener
app.listen(PORT, () =>
    console.log(`Note-taker is listening at http://localhost:${PORT}`)
);