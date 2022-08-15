import express from 'express';
const router = express.Router();
import * as controller from './grupo-controller.mjs';
import * as auth from '../../services/auth-service.mjs';

router.get('/grupo', controller.index);
router.get('/grupo/:id', controller.show);
router.post('/grupo', auth.requireLogin, controller.create);
router.put('/grupo', auth.requireLogin, controller.update);
router.delete('/grupo/:id', auth.requireLogin, controller.remove);
router.get('/grupo/filter/coleccion', controller.getByCollection);

export default router;
