require('dotenv').config()
const express = require('express');
const ApiRoute = require('./src/routes/routes');
const server = express();
const mongodb = require('./src/database/mongodb');

mongodb();

server.use(express.json());

server.use(express.urlencoded({extended: true}));



server.use('/', ApiRoute);

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando....');
});