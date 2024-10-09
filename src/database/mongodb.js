const mongoose = require('mongoose');
require('dotenv').config();


const connectdb = async () => {
    try {
        console.log('Conectando ao mongodb...');
        await mongoose.connect("mongodb+srv://showlimashow1977:H35Kjr1RdMKAbMJX@cluster0.ubsu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Mongodb conectado com sucesso');
    }catch(error) {
        console.log('Erro ao conectar ao mongodb: '+ error);
    }
}

module.exports = connectdb;

//process.env.MONGOURL