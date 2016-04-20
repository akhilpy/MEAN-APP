'use strict';

var express = require('express');
var controller = require('./offer.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/status/:status', controller.status);
router.get('/listing/:id', controller.listing);
router.get('/listing/:id/status/:status', controller.listingStatus);
router.get('/user/:id', controller.user);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
