'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/role/:role', auth.hasRole('admin'), controller.role);
router.get('/affiliate/:id/:role', auth.isAuthenticated(), controller.affiliate);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/bookmarks', auth.isAuthenticated(), controller.bookmarks);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/confirm-account', auth.isAuthenticated(), controller.confirmAccount);
router.post('/:id/last-login', auth.isAuthenticated(), controller.lastLogin);
router.post('/', controller.create);

export default router;
