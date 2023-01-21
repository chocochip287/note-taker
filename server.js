// Initialization/node stuff
const express = require("express");
const path = require("path");
// const fs = require("fs");

// Web server object
const app = express();
// Port number
const PORT = 6505;
// Link to db.json
const notesDB = require("./Develop/db/db.json");

// Setup for data parsing (why does everything break when I add these?)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json);

app.use(express.static("./Develop/public"));

// Routes

// Loads the homepage, index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});

// Loads notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
});

// Reads db.json (not working yet)
/*
app.get("api/notes", (req, res) => {
    res.json(notesDB);
})
*/

/*
// Note POST route
app.post("api/notes", (req, res) => {

});

*/

/*
// Deletion route
app.delete("api/notes/:id", (req, res) => {
    
})

*/

// Listener
app.listen(PORT, () =>
    console.log(`Note-taker is listening at http://localhost:${PORT}`)
);