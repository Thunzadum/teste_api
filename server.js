const express = require('express');

const app = express();

var port = process.env.PORT || 80

app.get('/', (req, res) =>{
    res.send('Olá Mundo!');
});

app.listen(port, () => {
    console.log('Server Iniciado...');
});