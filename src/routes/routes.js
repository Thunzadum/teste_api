const express = require('express');
const apicontroller = require('../controllers/apicontroller');
const torneiobluecontroller = require('../controllers/torneiobluecontroller');
const receitacontroller = require('../controllers/receitacontroller');
const router = express.Router();


//#region ######################### ROTAS APICONTROLLER
router.get('/ping', apicontroller.ping);
router.get('/info/:email', apicontroller.info);
router.get('/infomoedas/:nick', apicontroller.infomoedas);
router.get('/infovideos/:nick', apicontroller.infovideos);
router.get('/infotbregistro/:nick', apicontroller.infotbregistro);
router.get('/user/:nome', apicontroller.info);
router.get('/highscore', apicontroller.highscore);

router.post('/signup', apicontroller.signup);
router.post('/signin', apicontroller.signin);

router.put('/update/:id', apicontroller.update);
router.put('/user/:nick/moedas/:moedas', apicontroller.moedas);
router.put('/user/:nick/tbregistro/:tbregistro', apicontroller.tbregistro);

router.delete('/delete/:nick', apicontroller.delete);
//#endregion

//#region ######################### ROTAS RECEITAS CONTROLLER
router.get('/infobrutoGames/:receitaTotal', receitacontroller.infobrutoGames);
router.get('/infobonusJackPotTB/:receitaTotal', receitacontroller.infobonusJackPotTB);
router.get('/infobonusGrandeTB/:receitaTotal', receitacontroller.infobonusGrandeTB);
router.get('/infobonusMedioTB/:receitaTotal', receitacontroller.infobonusMedioTB);
router.get('/infobonusMiniTB/:receitaTotal', receitacontroller.infobonusMiniTB);

router.post('/receitaTotal', receitacontroller.receitaGeral);

router.put('/receita/:receitaTotal/brutoGames/:brutoGames', receitacontroller.brutoGames);
router.put('/receita/:receitaTotal/bonusJackPotTB/:bonusJackPotTB', receitacontroller.bonusJackPotTB);
router.put('/receita/:receitaTotal/bonusGrandeTB/:bonusGrandeTB', receitacontroller.bonusGrandeTB);
router.put('/receita/:receitaTotal/bonusMedioTB/:bonusMedioTB', receitacontroller.bonusMedioTB);
router.put('/receita/:receitaTotal/bonusMiniTB/:bonusMiniTB', receitacontroller.bonusMiniTB);
//#endregion

//#region ######################### ROTAS TORNEIO_BLUE CONTROLLER

router.get('/infoqtdparticipantes/:participantes', torneiobluecontroller.infoqtdparticipantes);
router.get('/inforankingparticipantes/:participantes', torneiobluecontroller.inforankingparticipantes);
router.get('/infoqtdregistroTB/:nick', torneiobluecontroller.infoqtdregistroTB);
router.get('/inforankingTB/:nick', torneiobluecontroller.inforankingTB);
router.get('/infoscoreTB/:nick', torneiobluecontroller.infoscoreTB);


router.post('/jogador', torneiobluecontroller.jogador);
router.post('/qtdjogador', torneiobluecontroller.qtdjogador);

router.put('/user/:nick/score/:score', torneiobluecontroller.score);
router.put('/torneioblue/:participantes/qtdparticipantes/:qtdparticipantes', torneiobluecontroller.qtdparticipantes);
router.put('/torneioblue/:nick/qtdregistroTB/:qtdregistroTB', torneiobluecontroller.qtdregistroTB);

//#region ######################### RANKING 01 AO 100 NICK, SCORE

//#region ######################### RANKING 01 AO 10 NICK, SCORE
router.get('/rankingumTB/:qtd', torneiobluecontroller.rankingum);
router.get('/rankingumscoreTB/:qtd', torneiobluecontroller.rankingumscore);

router.get('/rankingdoisTB/:qtd', torneiobluecontroller.rankingdois);
router.get('/rankingdoisscoreTB/:qtd', torneiobluecontroller.rankingdoisscore);

router.get('/rankingtresTB/:qtd', torneiobluecontroller.rankingtres);
router.get('/rankingtresscoreTB/:qtd', torneiobluecontroller.rankingtresscore);

router.get('/rankingquatroTB/:qtd', torneiobluecontroller.rankingquatro);
router.get('/rankingquatroscoreTB/:qtd', torneiobluecontroller.rankingquatroscore);

router.get('/rankingcincoTB/:qtd', torneiobluecontroller.rankingcinco);
router.get('/rankingcincoscoreTB/:qtd', torneiobluecontroller.rankingcincoscore);

router.get('/rankingseisTB/:qtd', torneiobluecontroller.rankingseis);
router.get('/rankingseisscoreTB/:qtd', torneiobluecontroller.rankingseisscore);

router.get('/rankingseteTB/:qtd', torneiobluecontroller.rankingsete);
router.get('/rankingsetescoreTB/:qtd', torneiobluecontroller.rankingsetescore);

router.get('/rankingoitoTB/:qtd', torneiobluecontroller.rankingoito);
router.get('/rankingoitoscoreTB/:qtd', torneiobluecontroller.rankingoitoscore);

router.get('/rankingnoveTB/:qtd', torneiobluecontroller.rankingnove);
router.get('/rankingnovescoreTB/:qtd', torneiobluecontroller.rankingnovescore);

router.get('/rankingdezTB/:qtd', torneiobluecontroller.rankingdez);
router.get('/rankingdezscoreTB/:qtd', torneiobluecontroller.rankingdezscore);
//#endregion

//#endregion

//#endregion

module.exports = router;