import express from 'express'
import mysql from 'mysql'

const router = express.Router()
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'salevision',
  password : 'secret',
  database : 'salevision'
});

connection.connect();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stats/gender', (req, res) => {

  // query params
  console.log(req.query)
  var itemID = req.query.id

  query = "select *, sales_m/sales_total as m_p, sales_f/sales_total as f_p from (select (select count(*) from sales where gender = 'f' and itemName = ?) as sales_f,
(select count(*) from sales where gender = 'm' and itemName = ?) as sales_m,
(select count(*) from sales where itemName = ?) as sales_total) as gender_stats;"
  connection.query(query,[itemID,itemID,itemID], function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });

  // process data here
  // run optimizer here
  // res.sendStatus(200)

});

router.get('/stats/age', (req, res) => {

  // query params
  console.log(req.query)
  var item = req.query.item

  query = "select *, sales_age_u18/sales_total, sales_age_u30/sales_total, sales_age_u50/sales_total, sales_age_o50/sales_total,
sales_total as p_age_u18 from (select (select count(*) from sales where itemName = ? and age <= 18) as sales_age_u18, 
(select count(*) from sales where itemName = ? and age > 18 and age <= 30) as sales_age_u30, 
(select count(*) from sales where itemName = ? and age > 31 and age <= 50) as sales_age_u50, 
(select count(*) from sales where itemName = ? and age > 50) as sales_age_o50, 
(select count(*) from sales where itemName = ?) as sales_total) as sales_temp;"
  connection.query(query,[item,item,item,item,item], function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });

  // process data here
  // run optimizer here
  // res.sendStatus(200)

})

router.post('/sales', (req, res) => {
  // query params
  console.log(req.body)
  var item = req.body.item;
  var age = req.body.buyer.age;
  var gender = req.body.buyer.gender;
  var mood = req.body.buyer.mood;

  connection.query('insert into sales values (DEFAULT,?,?,?,?,DEFAULT)', [item, age, gender, mood], function(err, results) {
  if (err) throw err;
  console.log('Sales submitted!');

  });

  // process data here
  // run optimizer here

  res.sendStatus(200)

})

export default router