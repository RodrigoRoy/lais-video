import express from 'express';
const router = express.Router();
import * as controller from './coleccion-controller.mjs';
import * as auth from '../../services/auth-service.mjs';

router.get('/coleccion', controller.index);
router.get('/coleccion/:id', controller.show);
router.post('/coleccion', auth.requireLogin, controller.create);
router.put('/coleccion', auth.requireLogin, controller.update);
router.delete('/coleccion/:id', auth.requireLogin, controller.remove);

export default router;
