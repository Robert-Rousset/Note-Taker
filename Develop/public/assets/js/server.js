// Getting all dependencies.
const express = require("express");
const path = require("path")
const fs = require("fs");
const id = require('nanoid')

const server = express();
const port = 3000;

server.use(express.urlencoded({ extended: true }))
server.use(express.json());
// Adding static link to make sure the css and javascript works while connected to server.
server.use(express.static(path.join(__dirname, "../../../public")));

// Adding notes.html page to the /notes path
server.get('/notes', (request, response) => response.sendFile(path.join(__dirname, "../../notes.html")));

// Sending the db.json file when there is the getNotes() get request.
server.get('/api/notes', (request, response) => response.sendFile(path.join(__dirname, '../../../db/db.json')));

// Writing notes into the db.json file when there is a Post request.
server.post('/api/notes', (request, response) =>{

    // assigning variable to whatever is in the post requests body.
    let note = request.body
    // adding an id parameter to this request body and calling the nanoid function on it.
    request.body.id = id.nanoid();

    // readFile response returns a buffer, which gets converted to JSON object, then the note is pushed into this json object, and the file is written with this new object as a json string.
    fs.readFile(path.join(__dirname, "../../../db/db.json"), (error, response)=>{
        if(error) throw error
        let allNotesInFile = JSON.parse(response)
        allNotesInFile.push(note);

        fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(allNotesInFile), (error)=>{
            if(error) throw error
        })
    })
    response.end()
})

// Accepting delete requests.
server.delete("/api/notes/:id", (request, response) => {
    // retrieving the selected Notes ID. 
    let deleteNoteId = request.params.id;
  
    // once again reading the file and converting to usable information, then filtering the info in the file and sending back allNotes that do not equal the selected Notes ID. Then finally writing the file again with this new array.
    fs.readFile(path.join(__dirname, "../../../db/db.json"), (error, response) => {
      if (error) throw error;
      let allNotesInDbFile = JSON.parse(response);
      let newArrayWithoutDeletedNote = allNotesInDbFile.filter((allNotes) => allNotes.id !== deleteNoteId);
      fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(newArrayWithoutDeletedNote), (error) => {
          if (error) throw error;
        })
    });
    response.end()
});
  
// Accepting requests from all other paths. This right here annoyed me, I had it higher up and couldnt figure out why the API requests werent working, took me way too long to realize this path was overriding all other paths. 
server.get('*', (request, response) => response.sendFile(path.join(__dirname, '../../index.html')));

// Listening to server.
server.listen(port, () => console.log(`app listening on port:${port}`));