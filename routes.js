import express from 'express'

const router = express.Router()

router.get('/portfolio', (req, res) => {

  // query params
  console.log(req.query)

  // process data here
  // run optimizer here

  res.sendStatus(200)

})

router.post('/update', (req, res) => {

  // query params
  console.log(req.query)

  // process data here
  // run optimizer here

  res.sendStatus(200)

})

export default router