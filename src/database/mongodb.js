const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
    try {
        console.log('Conectando ao mongodb...');
        await mongoose.connect(process.env.MONGOURL);
        console.log('Mongodb conectado com sucesso');
    }catch(error) {
        console.log('Erro ao conectar ao mongodb: '+ error);
    }
}

module.exports = connectdb;