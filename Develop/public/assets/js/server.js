const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/notes', (request, response) => response.sendFile(path.join(__dirname, "../../notes.html")));

server.get('*', (request, response) => response.sendFile(path.join(__dirname, '../../index.html')));


server.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));