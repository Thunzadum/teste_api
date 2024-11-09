const TorneioBlue = require('../models/TorneioBlue');
const bcrypt = require('bcrypt');



module.exports = {
    qtdjogador: async(req, res) => {
        let {
            participantes,
            qtdparticipantes,
        } = req.body;


        const userExist = await TorneioBlue.findOne({ participantes });
        if(userExist) {
            res.json({
                data: [],
                error: 'Usuário inválido'
            });
            return;
        }
        const newUser = new TorneioBlue({
            participantes,
            qtdparticipantes,
        });

        const userSave = await newUser.save();
        if(userSave) {
            res.json({
                data: userSave,
                msg: "",
                //error: ''
            });
            return;
        } else {
            res.json({
                data: [],
                error: 'Erro ao salvar usuário'
            });
            return;
        }
    },
    jogador: async(req, res) => {
        let {
            nick,
            qtdregistroTB,
            score,
            ranking,
        } = req.body;


        const userExist = await TorneioBlue.findOne({ nick });
        if(userExist) {
            res.json({
                data: [],
                error: 'Usuário inválido'
            });
            return;
        }
        const newUser = new TorneioBlue({
            nick,
            qtdregistroTB,
            score,
            ranking,
        });

        const userSave = await newUser.save();
        if(userSave) {
            res.json({
                data: userSave,
                msg: "",
                //error: ''
            });
            return;
        } else {
            res.json({
                data: [],
                error: 'Erro ao salvar usuário'
            });
            return;
        }
    },
    score: async(req, res) => {
        const nick = req.params.nick;
        const newScore = req.params.score;
        const user = await TorneioBlue.findOne({nick}).exec();
        if(!user) {
            res.json({
                error: 'Usuário Inválido!'
            });
            return;
        }

        const id = user._id;
        const scoreAtual = user.score;
        if(newScore > scoreAtual || newScore < scoreAtual) {
            const userUpdate = await TorneioBlue.findByIdAndUpdate(id, {score: newScore});
            if(!userUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            const geraRanking = await TorneioBlue.aggregate([
                {
                    $setWindowFields: {
                        sortBy: {score: -1},
                        output: {
                            ranking: {
                                $rank: {}
                            },
                        },
                    },
                },
            ]).exec();
            geraRanking.map((user) => {
                TorneioBlue.updateOne({_id: user._id}, {ranking: user.ranking}).exec();
            });
            res.json({
                data: [],
                msg: 'Score alterado com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: 'Noob'
            });
            return;
        }
    },
}