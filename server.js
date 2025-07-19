require('dotenv').config()
const express = require('express');
const ApiRoute = require('./src/routes/routes');
const server = express();
const mongodb = require('./src/database/mongodb');

const cors = require('cors');
mongodb();

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

server.use(express.json());

server.use(express.urlencoded({extended: true}));



server.use('/', ApiRoute);

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando....');
});

//