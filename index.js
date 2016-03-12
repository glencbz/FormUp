import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import cors from 'cors';

var bodyParser = require('body-parser');

console.log('Server online')
express()
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use('/', routes)
  .listen(4005);