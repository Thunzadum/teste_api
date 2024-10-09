const express = require('express');
const apicontroller = require('../controllers/apicontroller');
const router = express.Router();


router.get('/ping', apicontroller.ping);
router.post('/signup', apicontroller.signup);

module.exports = router;