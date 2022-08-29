

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { rateLimit } from 'express-rate-limit';

/**
 * Establece el ambiente de desarrollo: production, development
 * @param {Object} app - Aplicación de expressJS
 */
export function setEnvironment(app){
  if(process.env.NODE_ENV !== 'production'){
    setDevEnv(app);
  }
  else {
    setProdEnv(app);
  }
}

const limiterApi = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // 100 peticiones
})

const limiterRegisterAuth = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	max: 100, // 10 peticiones
})

/**
 * Establece ambiente de desarrollo con logs adicionales
 * @param {Object} app - Aplicación de expressJS
 */
function setDevEnv(app){
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = `${process.env.MY_DB_HOST}/${process.env.MY_DB_NAME_DEV}`; // mongodb://localhost:27017/lais-video-dev
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN}`;
  app.use('/api/auth', limiterRegisterAuth);
  app.use('/api/register', limiterRegisterAuth);
  app.use('/api', limiterApi);
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

/**
 * Establece ambiente de producción sin logs adicionales
 * @param {Object} app - Aplicación de expressJS
 */
function setProdEnv(app){
  process.env.NODE_ENV = 'production';
  process.env.DB_URL = `${process.env.MY_DB_HOST}/${process.env.MY_DB_NAME_PROD}`
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN}`;
  app.use('/api', limiterApi);
  app.use('/api/auth', limiterRegisterAuth);
  app.use('/api/register', limiterRegisterAuth);
  app.use(bodyParser.json());
  app.use(cors());
//   app.use(express.static(__dirname + '/../../dist'));
}
