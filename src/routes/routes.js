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
//#endregion

module.exports = router;