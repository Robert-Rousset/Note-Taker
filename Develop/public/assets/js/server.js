const express = require("express");
const path = require("path")
const fs = require("fs");

const server = express();
const port = 3000;

server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.use(express.static(path.join(__dirname, "../../../public")));

server.get('/notes', (request, response) => response.sendFile(path.join(__dirname, "../../notes.html")));

server.get('/api/notes', (request, response) => response.sendFile(path.join(__dirname, '../../../db/db.json')));

server.post('/api/notes', (request, response) =>{

    let note = request.body

    fs.readFile(path.join(__dirname, "../../../db/db.json"), (error, response)=>{
        if(error) throw error
        let addToArray = JSON.parse(response)
        addToArray.push(note);

        fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(addToArray), (error, response)=>{
            if(error) throw error
            console.log(response)
        } )
    })
    response.end()
})

server.get('*', (request, response) => response.sendFile(path.join(__dirname, '../../index.html')));

server.listen(port, () => {
  console.log(`app listening on port:${port}`);
});