const mongoose = require('mongoose');
require('dotenv').config();


const connectdb = async () => {
    try {
        console.log('Conectando ao mongodb...');
        await mongoose.connect("mongodb+srv://showlimashow1978:9jUNY9mOtudyQvUj@cluster0.z7j6p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Mongodb conectado com sucesso');
    }catch(error) {
        console.log('Erro ao conectar ao mongodb: '+ error);
    }
}

module.exports = connectdb;

//process.env.MONGOURL

//9jUNY9mOtudyQvUj