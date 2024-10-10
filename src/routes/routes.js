const express = require('express');
const apicontroller = require('../controllers/apicontroller');
const router = express.Router();


//#region ######################### ROTAS APICONTROLLER
router.get('/ping', apicontroller.ping);
router.get('/info/:email', apicontroller.info);
router.get('/infomoedas/:nick', apicontroller.infomoedas);
router.get('/infovideos/:nick', apicontroller.infovideos);
router.get('/user/:nome', apicontroller.info);
router.get('/highscore', apicontroller.highscore);

router.post('/signup', apicontroller.signup);
router.post('/signin', apicontroller.signin);

router.put('/update/:id', apicontroller.update);
router.put('/user/:nick/moedas/:moedas', apicontroller.moedas);

router.delete('/delete/:nick', apicontroller.delete);
//#endregion

module.exports = router;