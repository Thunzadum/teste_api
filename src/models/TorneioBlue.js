const mongoose = require('mongoose');
const modelSchema = new mongoose.Schema({
    participantes: String,
    nick: String,
    qtdregistroTB: Number,
    score: Number,
    ranking: Number,
    qtdparticipantes: Number,
});

const modelName = 'TorneioBlue';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}