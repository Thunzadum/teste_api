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
    }
}