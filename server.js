require('dotenv').config()
const express = require('express');

const server = express();

server.use(express.json());

server.use(express.urlencoded({extended: true}));



server.use('/ping', (req, res) => {
    res.send('Pong!');
});

server.use('/ola', (req, res) => {
    res.send('Olá Daniel!');
});

server.use('/', (req, res) => {
    res.send('Olá!');
});

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando....');
});