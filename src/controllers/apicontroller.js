const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    ping: async(req, res) => {
        res.json({pong: true});
    },

    signup: async(req, res) => {
        let{
            email,
            nick,
            password,
            moedas,
            videos
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
            nick,
            passwordHash,
            moedas,
            videos
        });

        const userSave = await newUser.save();
        if(userSave) {
            res.json({
                data: userSave,
                msg: '',
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
    },
    signin: async(req, res) => {
        let {
            email,
            password
        } = req.body;
        const userExist = await User.findOne({email});
        if(!userExist) {
            res.json({
                data: [],
                msg: 'Usuário inválido',
                error: ''
            });
            return;
        }
        const match = await bcrypt.compare(password, userExist.passwordHash);
        if(!match) {
            res.json({
                data: [],
                msg: 'Credenciais inválidas',
                error: ''
            });
            return;
        }
        res.json({
            data: userExist,
            msg: ""
            //error: ''
        });
    },
}


//H35Kjr1RdMKAbMJX