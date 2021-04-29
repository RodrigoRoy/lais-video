import express from 'express';
const router = express.Router();
import * as controller from './video-controller';
import * as auth from '../../services/auth-service';

router.post('/video', auth.requireLogin, controller.create);
router.get('/video', auth.requireLogin, controller.index);
router.get('/video/:id', auth.requireLogin, controller.show);
router.put('/video', auth.requireLogin, controller.update);
router.delete('/video/:id', auth.requireLogin, controller.remove);

export default router;
