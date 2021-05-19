
const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());