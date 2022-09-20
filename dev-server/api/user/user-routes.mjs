/**
 * Definición de las rutas http para consulta de usuarios
 * @module api/user/user-routes
 */
import express from "express";
const router = express.Router();
import * as controller from './user-controller.mjs'
import * as auth from '../../services/auth-service.mjs'

router.get('/user', controller.index);
router.get('/user/:id', controller.show);
router.get('/user/relatedData/:id', controller.indexData);
router.put('/user', auth.requireLogin, controller.update);
router.delete('/user/:id', auth.requireLogin, controller.remove);

/**
 * Registra todas las rutas para consulta usuarios usando el prefijo "/user"
 * mediante una instancia de la clase express
 */
export default router;