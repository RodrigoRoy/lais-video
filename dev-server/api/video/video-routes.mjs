import express from 'express';
const router = express.Router();
import * as controller from './video-controller.mjs';
import * as auth from '../../services/auth-service.mjs';

router.get('/video', controller.index);
router.get('/video/filter', controller.filter);
router.get('/video/:id', controller.show);
router.post('/video', auth.requireLogin, controller.create);
router.put('/video', auth.requireLogin, controller.update);
router.delete('/video/:id', auth.requireLogin, controller.remove);
router.get('/video/breadcrumbs/:id', controller.getBreadcrumbs) // TODO @EmmanuelCruz incorporar autenticacion

export default router;
