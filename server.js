require('dotenv').config()

const express = require('express');

const server = express();

server.use('/', (req, res) => {
    res.send('Olá Daniel!');
});

server.use('/ping', (req, res) => {
    res.send('pong');
});

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando....');
});