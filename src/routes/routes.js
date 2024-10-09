const express = require('express');
const apicontroller = require('../controllers/apicontroller');
const router = express.Router();


router.get('/ping', apicontroller.ping);

module.exports = router;