require('dotenv').config()

const express = require('express');

const server = express();

server.use('/ping', (req, res) => {
    res.send('Pong!');
});

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando....');
});