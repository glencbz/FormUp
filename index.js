import express from 'express'
import morgan from 'morgan'
import routes from './routes'

console.log('Server online')
express()
  // .use(cors)
  .use(morgan('dev'))
  .use('/', routes)
  .listen(4005)