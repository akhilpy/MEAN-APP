'use strict';

var express = require('express');
var controller = require('./report.controller');

var router = express.Router();

router.get('/listings', controller.listings);
router.get('/users', controller.users);
router.get('/transactions', controller.transactions);
router.get('/balances', controller.balances);

module.exports = router;
