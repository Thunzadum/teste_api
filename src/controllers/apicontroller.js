const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    ping: async(req, res) => {
        res.json({pong: true});
    },

    signup: async(req, res) => {
        let {
            //avatar,
            //nome,
            nick,
            email,
            password,
            moedas,
            videos,
            //score,
            //ranking,
            //timeGame
        } = req.body;


        const userExist = await User.findOne({ email });
        if(userExist) {
            res.json({
                data: [],
                error: 'Usuário inválido'
            });
            return;
        }
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            //avatar,
            //nome,
            nick,
            email,
            passwordHash,
            moedas,
            videos,
            //score,
            //ranking,
            //timeGame
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
    moedas: async(req, res) => {
        const nick = req.params.nick;
        const newMoedas = req.params.moedas;
        const user = await User.findOne({nick}).exec();
        if(!user) {
            res.json({
                error: 'Usuário Inválido!'
            });
            return;
        }

        const id = user._id;
        const moedasAtual = user.moedas;
        if(newMoedas > moedasAtual || newMoedas < moedasAtual) {
            const userUpdate = await User.findByIdAndUpdate(id, {moedas: newMoedas});
            if(!userUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            res.json({
                data: [],
                msg: 'Moedas alteradas com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: ''
            });
            return;
        }
    },
    videos: async(req, res) => {
        const nick = req.params.nick;
        const newVideos = req.params.videos;
        const user = await User.findOne({nick}).exec();
        if(!user) {
            res.json({
                error: 'Usuário Inválido!'
            });
            return;
        }

        const id = user._id;
        const videosAtual = user.videos;
        if(newVideos > videosAtual || newVideos < videosAtual) {
            const userUpdate = await User.findByIdAndUpdate(id, {videos: newVideos});
            if(!userUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            res.json({
                data: [],
                msg: 'Videos alterados com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: ''
            });
            return;
        }
    },
    delete: function(req, res, next){
        var query = { nick: req.params.nick}
        var value = req.body;
        User.findOneAndDelete(query, value).then(data => {
            res.json({
                msg: 'Usuário deletado com sucesso'
            });
        });
    },
    info: async(req, res) => {
        const email = req.params.email;
        const userInfo = await User.findOne({email})
        //.select({nick: 1, avatar: 1, ranking: 1, score: 1, _id: 0})
        .select({nick: 1, _id: 0})
        .exec();
        if(!userInfo) {
            res.json({
                data: [],
                error: 'Usuario nao encontrado'
            });
            return;
        }
        res.json({
            userInfo
        });
    },
    infomoedas: async(req, res) => {
        const nick = req.params.nick;
        const userInfo = await User.findOne({nick})
        //.select({nick: 1, avatar: 1, ranking: 1, score: 1, _id: 0})
        .select({moedas: 1, _id: 0})
        .exec();
        if(!userInfo) {
            res.json({
                data: [],
                error: 'Usuario nao encontrado'
            });
            return;
        }
        res.json({
            userInfo
        });
    },
    infovideos: async(req, res) => {
        const nick = req.params.nick;
        const userInfo = await User.findOne({nick})
        .select({videos: 1, _id: 0})
        .exec();
        if(!userInfo) {
            res.json({
                data: [],
                error: 'Usuario nao encontrado'
            });
            return;
        }
        res.json({
            userInfo
        });
    },
    update: async(req, res) => {
        let {
            avatar,
            nome,
            nick,
            email
        } = req.body;

        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id,{
            nome,
            avatar,
            nick,
            email
        }).exec();
        if(!user) {
            res.json({
                data: [],
                error: 'Usuario invalido'
            });
            return;
        }

        res.json({
            data: [],
            msg: 'Usuario alterado com sucesso',
            error: ''
        });
    },
    highscore: async(req, res) => {
        const user = await User.find({
            ranking: 1,
            score: {$gt: 0}
        })
        .sort({ranking: 1})
        .limit(2)
        .select({
            //nick: 1,
            //avatar: 1,
            ranking: 1,
            //score: 1,
            nome: 1,
            _id: 0
        }).exec();
        if(!user) {
            res.json({
                data: [],
                msg: 'Erro ao realizar consulta'
            });
            return;
        }
        res.json({
            user
        });
    },
}


//H35Kjr1RdMKAbMJX