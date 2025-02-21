const TorneioBlue = require('../models/TorneioBlue');
const bcrypt = require('bcrypt');



module.exports = {
    qtdjogador: async(req, res) => {
        let {
            participantes,
            qtdparticipantes,
            ranking
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
    qtdparticipantes: async(req, res) => {
        const participantes = req.params.participantes;
        const newQtdparticipantes= req.params.qtdparticipantes;
        const torneioblue = await TorneioBlue.findOne({participantes}).exec();
        if(!torneioblue) {
            res.json({
                error: 'Usuário Inválido!'
            });
            return;
        }

        const id = torneioblue._id;
        const qtdparticipantesAtual = torneioblue.qtdparticipantes;
        if(newQtdparticipantes > qtdparticipantesAtual || newQtdparticipantes < qtdparticipantesAtual) {
            const torneioblueUpdate = await TorneioBlue.findByIdAndUpdate(id, {qtdparticipantes: newQtdparticipantes});
            if(!torneioblueUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            res.json({
                data: [],
                msg: 'Qtdparticipantes alterado com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: 'Noob'
            });
            return;
        }
    },
    infoqtdparticipantes: async(req, res) => {

        const participantes = req.params.participantes;
        const torneioblueInfoqtdparticipantes = await TorneioBlue.findOne({participantes})
        .select({qtdparticipantes: 1, _id: 0})
        .exec();
        if(!torneioblueInfoqtdparticipantes) {
            res.json({
                data: [],
                error: 'Torneio nao encontrado'
            });
            return;
        }
        res.json({
            torneioblueInfoqtdparticipantes
        });
    },
    inforankingparticipantes: async(req, res) => {

        const participantes = req.params.participantes;
        const torneioblueInforankingparticipantes = await TorneioBlue.findOne({participantes})
        .select({ranking: 1, _id: 0})
        .exec();
        if(!torneioblueInforankingparticipantes) {
            res.json({
                data: [],
                error: 'Torneio nao encontrado'
            });
            return;
        }
        res.json({
            torneioblueInforankingparticipantes
        });
    },
    infoqtdregistroTB: async(req, res) => {
        const nick = req.params.nick;
        const torneioblueInfoqtdregistroTB = await TorneioBlue.findOne({nick})
        .select({qtdregistroTB: 1, _id: 0})
        .exec();
        if(!torneioblueInfoqtdregistroTB) {
            res.json({
                data: [],
                error: 'Registro nao encontrado'
            });
            return;
        }
        res.json({
            torneioblueInfoqtdregistroTB
        });
    },
    inforankingTB: async(req, res) => {
        const nick = req.params.nick;
        const torneioblueInforankingTB = await TorneioBlue.findOne({nick})
        .select({ranking: 1, _id: 0})
        .exec();
        if(!torneioblueInforankingTB) {
            res.json({
                data: [],
                error: 'Registro nao encontrado'
            });
            return;
        }
        res.json({
            torneioblueInforankingTB
        });
    },
    qtdregistroTB: async(req, res) => {
        const nick = req.params.nick;
        const newQtdregistroTB= req.params.qtdregistroTB;
        const torneioblue = await TorneioBlue.findOne({nick}).exec();
        if(!torneioblue) {
            res.json({
                error: 'Usuário Inválido!'
            });
            return;
        }

        const id = torneioblue._id;
        const qtdregistroTBAtual = torneioblue.qtdregistroTB;
        if(newQtdregistroTB > qtdregistroTBAtual || newQtdregistroTB < qtdregistroTBAtual) {
            const torneioblueUpdate = await TorneioBlue.findByIdAndUpdate(id, {qtdregistroTB: newQtdregistroTB});
            if(!torneioblueUpdate) {
                res.json({error: 'Error ao realizar update!'});
            }
            res.json({
                data: [],
                msg: 'QtdregistroT1 alterado com sucesso'
            })
        } else {
            res.json({
                data: [],
                msg: ''
            });
            return;
        }
    },
    infoscoreTB: async(req, res) => {
        const nick = req.params.nick;
        const torneioblueInfoscoreTB = await TorneioBlue.findOne({nick})
        .select({score: 1, _id: 0})
        .exec();
        if(!torneioblueInfoscoreTB) {
            res.json({
                data: [],
                error: 'Registro nao encontrado'
            });
            return;
        }
        res.json({
            torneioblueInfoscoreTB
        });
    },


    //#region ######################### GET RANKING 01 AO 100 NAME, SCORE

    //#region ######################### GET RANKING 01 AO 10 NAME, SCORE

    //#region ######################### GET RANKING 01 NAME, SCORE
    rankingum: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 1,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
            //msg: 'Sucesso ao realizar a consulta'
        });
    },
    rankingumscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 1,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
            //msg: 'Sucesso ao realizar a consulta'
        });
    },
    //#endregion

    //#region ######################### GET RANKING 02 NAME, SCORE
    rankingdois: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 2,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingdoisscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 2,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 03 NAME, SCORE
    rankingtres: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 3,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingtresscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 3,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 04 NAME, SCORE
    rankingquatro: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 4,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingquatroscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await Torneioblue.find({
            ranking: 4,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 05 NAME, SCORE
    rankingcinco: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 5,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingcincoscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 5,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 06 NAME, SCORE
    rankingseis: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 6,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingseisscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 6,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 07 NAME, SCORE
    rankingsete: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 7,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingsetescore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 7,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 08 NAME, SCORE
    rankingoito: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 8,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingoitoscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 8,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 09 NAME, SCORE
    rankingnove: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 9,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            nick: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    rankingnovescore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 9,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
        });
    },
    //#endregion

    //#region ######################### GET RANKING 10 NAME, SCORE
    rankingdez: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 10,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            //ranking: 1,
            //avatar: 1,
            //nome: 1,
            nick: 1,
            //score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
            //msg: 'Sucesso ao realizar a consulta'
        });
    },
    rankingdezscore: async(req, res) => {
        const qtd = req.params.qtd;
        const rankingList = await TorneioBlue.find({
            ranking: 10,
            score: {$ne: 0}
        })
        .sort({ranking: 1})
        .limit(parseInt(qtd))
        .select({
            //ranking: 1,
            //avatar: 1,
            //nome: 1,
            score: 1,
            _id: 0
        }).exec();
        if(!rankingList) {
            res.json({
                data: [],
                error: 'Erro ao realizar a consulta'
            });
            return;
        }
        res.json({
            data: rankingList,
            //msg: 'Sucesso ao realizar a consulta'
        });
    },
    //#endregion

    //#endregion

    //#endregion
}