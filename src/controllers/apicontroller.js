const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    ping: async(req, res) => {
        res.json({pong: true});
    },

    signup: async(req, res) => {
        let{
            email,
            nome,
            password,
            score
        } = req.body;

        const userExist = await User.findOne({email});
        if(userExist) {
            res.json({
                data: [],
                error: 'Usuário já Existe'
            });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            nome,
            passwordHash,
            score
        });

        const userSave = await newUser.save();
        if(userSave) {
            res.json({
                data: userSave,
                msg: 'Usuário salvo com sucesso!',
                error: ''
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


//H35Kjr1RdMKAbMJX