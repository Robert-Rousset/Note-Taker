const express = require('express');
const path = require('path');
const fs = require('fs')
let allNotes = require('../../../db/db.json')

const server = express();
const PORT = 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, "../../../public")))

server.get('/notes', (request, response) => response.sendFile(path.join(__dirname, "../../notes.html")));

server.get('*', (request, response) => response.sendFile(path.join(__dirname, '../../index.html')));



server.post('/api/notes', (request, response) =>{

    let note = request.body

    allNotes.push(note)

    console.log(allNotes)
    response.end()
})

server.get('/api/notes', (request, response) => {
    response.sendFile(allNotes)
})

server.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));