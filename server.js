/*
1/23/23
To Do:
* complete the POST route for /api/notes.

*/

// Initialization/node stuff
const express = require("express");
const path = require("path");
const data = require("./Develop/db/db.json");
// const fs = require("fs");
// Imports uniqid for ID generation on posts - ID generator method is uniqid();
const uniquid = require("uniqid");

// Web server object
const app = express();

// Port number
const PORT = 6505;


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

// Reads db.json (not broken or breaking by itself, but non-functional at the moment)

app.get("/api/notes", (req, res) => {
    res.json(data);
})

// Note POST route
app.post("/api/notes", (req, res) => {

});

/*
// Deletion route
app.delete("api/notes/:id", (req, res) => {
    
})

*/

// Listener
app.listen(PORT, () =>
    console.log(`Note-taker is listening at http://localhost:${PORT}`)
);