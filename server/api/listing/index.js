'use strict';

var express = require('express');
var controller = require('./listing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/status/:status', controller.status);
router.get('/affiliate/:id/listings', controller.affiliateListings);
router.get('/affiliate/:id/investments', controller.affiliateInvestments);
router.get('/user/:id', controller.showUser);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/comment/:id', controller.comment);
router.post('/comment/:id', controller.commentDelete);
router.put('/reply/:id', controller.reply);
router.post('/reply/:id', controller.replyDelete);
router.put('/request-more/:id', controller.requestMore.create);
router.post('/request-more/update/:id', controller.requestMore.update);
router.put('/bookmark/:id', controller.bookmark);
router.post('/bookmark/:id', controller.bookmarkRemove);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
