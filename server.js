const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

//npm package for creating a unique identifier
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware to parse JSON and URL Encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to serve assets in the public folder
app.use(express.static('public'));

//API routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let noteData = JSON.parse(data)
        res.json(noteData)
    })
});

app.post('/api/notes', (req, res) => {
    const rawData = fs.readFileSync('./db/db.json');
    const currentDb = JSON.parse(rawData);
    const note = req.body
    note.id = uuidv4()
    currentDb.push(note)
    fs.writeFileSync('./db/db.json', JSON.stringify(currentDb))
    res.json(currentDb)
});

app.delete('/api/notes/:id' , (req, res) => {
    const rawData = fs.readFileSync('./db/db.json');
    const currentDb = JSON.parse(rawData);
    const idToDelete = req.params.id;
    const newNotes = currentDb.filter((note) => note.id !== idToDelete);
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes))
    res.json(newNotes)
});

//HTML Routes
//Notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});
//Homepage and all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`App listening at localhost:${PORT}`)
});