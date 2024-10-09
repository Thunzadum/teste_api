const mongoose = require ('mongoose');
const modelSchema = new mongoose.Schema({
    email: String,
    nick: String,
    passwordHash: String,
    moedas: Number,
    videos: Number,
});

const modelName = 'Users';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}