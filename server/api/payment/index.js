'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./payment.controller');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/add-account', urlencodedParser, controller.addAccount);
router.post('/update-account', urlencodedParser, controller.updateAccount);
router.post('/transaction', urlencodedParser, controller.transaction);
router.post('/logs', urlencodedParser, controller.logs);
router.post('/logs/filtered', urlencodedParser, controller.logsFiltered);

module.exports = router;
