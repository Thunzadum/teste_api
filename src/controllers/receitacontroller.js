const Receita = require('../models/Receita');
const bcrypt = require('bcrypt');



module.exports = {

    receitaGeral: async(req, res) => {
        let {
            receitaTotal,
            brutoGames,
            brutoGamePJP,
            brutoEmpresa,
            imposto,
            caixadaEmpresa,
            liquido,
            bonusJackPotTB,
            bonusGrandeTB,
            bonusMedioTB,
            bonusMiniTB,
        } = req.body;


        const userExist = await Receita.findOne({ receitaTotal});
        if(userExist) {
            res.json({
                data: [],
                error: 'Usuário inválido'
            });
            return;
        }
        const newUser = new Receita({
            receitaTotal,
            brutoGames,
            brutoGamePJP,
            brutoEmpresa,
            imposto,
            caixadaEmpresa,
            liquido,
            bonusJackPotTB,
            bonusGrandeTB,
            bonusMedioTB,
            bonusMiniTB,
        });

        const userSave = await newUser.save();
        if(userSave) {
            res.json({
                data: userSave,
                msg: "",
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
    brutoGames: async(req, res) => {
        const receitaTotal = req.params.receitaTotal;
        const newBrutoGames= req.params.brutoGames;
        const receita = await Receita.findOne({receitaTotal}).exec();
        if(!receita) {
            res.json({
                error: 'Receita Inválida!'
            });
            return;
        }

        const id = receita._id;
        const brutoGamesAtual = receita.brutoGames;
        if(newBrutoGames > brutoGamesAtual || newBrutoGames < brutoGamesAtual) {
            const receitaUpdate = await Receita.findByIdAndUpdate(id, {brutoGames: newBrutoGames});
            if(!receitaUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            res.json({
                data: [],
                msg: 'BrutoGames alterado com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: 'Noob'
            });
            return;
        }
    },
    infobrutoGames: async(req, res) => {

        const receitaTotal = req.params.receitaTotal;
        const inforeceitabrutoGames = await Receita.findOne({receitaTotal})
        .select({brutoGames: 1, _id: 0})
        .exec();
        if(!inforeceitabrutoGames) {
            res.json({
                data: [],
                error: 'Receita nao encontrada'
            });
            return;
        }
        res.json({
            inforeceitabrutoGames
        });
    },
}