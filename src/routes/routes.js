const express = require('express');
const apicontroller = require('../controllers/apicontroller');
const router = express.Router();


router.get('/ping', apicontroller.ping);
router.post('/signup', apicontroller.signup);
router.post('/signin', apicontroller.signin);

module.exports = router;