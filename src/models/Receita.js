const mongoose = require('mongoose');
const modelSchema = new mongoose.Schema({
    receitaTotal: String,
    brutoGames: Number,
    brutoGamePJP: Number,
    brutoEmpresa: Number,
    imposto: Number,
    caixadaEmpresa: Number,
    liquido: Number,
    bonusJackPotTB: Number,
    bonusGrandeTB: Number,
    bonusMedioTB: Number,
    bonusMiniTB: Number,
});

const modelName = 'Receita';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}