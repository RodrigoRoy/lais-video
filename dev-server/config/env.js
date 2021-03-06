import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

export function setEnvironment(app){
  if(process.env.NODE_ENV != 'production'){
    setDevEnv(app);
  }
  else {
    setProdEnv(app);
  }
}

function setDevEnv(app){
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = `${process.env.MY_DB_HOST}${process.env.MY_DB_NAME_DEV}`;
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN_DEV}`;
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

function setProdEnv(app){
  process.env.DB_URL = `${process.env.MY_DB_HOST}${process.env.MY_DB_NAME_PROD}`
  process.env.TOKEN_SECRET = `${process.env.MY_TOKEN_PROD}`;
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));
}
