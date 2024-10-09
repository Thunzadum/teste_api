const express = require('express');

const server = express();

server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});