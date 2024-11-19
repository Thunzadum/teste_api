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

}