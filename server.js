const express = require('express');

const server = express();

var port = process.env.PORT 

server.use('/ping', (req, res) => {
    res.send('pong');
});

server.listen(port, () => {
    console.log('Servidor rodando....');
});