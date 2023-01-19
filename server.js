// Initialization/node stuff
const express = require("express");
// const path = require("path");
// const fs = require("fs");

const app = express();
const PORT = 6505;

/*
// Setup for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json);
*/

// app.use(express.static("public"));

// Routes

// Loads the homepage
app.get("/", (req, res) => res.send("Just seeing if we're working here."));

// Listener
app.listen(PORT, () =>
    console.log(`Note-taker is listening at http://localhost:${PORT}`)
);