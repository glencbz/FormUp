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

router.get('/stats/item/gender', (req, res) => {

  // query params
  console.log(req.query)
  var itemID = req.query.id

  query = `select *, sales_m/sales_total as m_p, sales_f/sales_total as f_p from (select (select count(*) from sales where gender = 'f' and itemName = ?) as sales_f,
(select count(*) from sales where gender = 'm' and itemName = ?) as sales_m,
(select count(*) from sales where itemName = ?) as sales_total) as gender_stats;`;
  connection.query(query,[itemID,itemID,itemID], function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });

  // process data here
  // run optimizer here
  // res.sendStatus(200)

});

router.get('/stats/item/age', (req, res) => {

  // query params
  console.log(req.query)
  var item = req.query.item

  query = `select *, sales_age_u18/sales_total, sales_age_u30/sales_total, sales_age_u50/sales_total, sales_age_o50/sales_total,
sales_total as p_age_u18 from (select (select count(*) from sales where itemName = ? and age <= 18) as sales_age_u18, 
(select count(*) from sales where itemName = ? and age > 18 and age <= 30) as sales_age_u30, 
(select count(*) from sales where itemName = ? and age > 31 and age <= 50) as sales_age_u50, 
(select count(*) from sales where itemName = ? and age > 50) as sales_age_o50, 
(select count(*) from sales where itemName = ?) as sales_total) as sales_temp;`;
  connection.query(query,[item,item,item,item,item], function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });

  // process data here
  // run optimizer here
  // res.sendStatus(200)

});

router.get('/stats/gender', (req, res) => {

  // query params
  console.log(req.query)
  var gender = req.query.gender

  query = `select *, sales_a/sales_total as a_p, sales_o/sales_total as o_p, sales_ba/sales_total as ba_p, 
sales_t/sales_total as t_p, sales_br/sales_total as br_p from (select 
(select count(*) from sales where gender = ? and itemName = 'apple') as sales_a,
(select count(*) from sales where gender = ? and itemName = 'orange') as sales_o,
(select count(*) from sales where gender = ? and itemName = 'banana') as sales_ba,
(select count(*) from sales where gender = ? and itemName = 'tomato') as sales_t,
(select count(*) from sales where gender = ? and itemName = 'bratwurst') as sales_br,
(select count(*) from sales where gender = ?) as sales_total) as gender_stats;`;
  connection.query(query,[gender,gender,gender,gender,gender,gender], function(err, rows, fields) {
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
  var lower = req.query.lower;
  var lower = req.query.upper;

  query = `select *, sales_a/sales_total as a_p, sales_o/sales_total as o_p, sales_ba/sales_total as ba_p, 
sales_t/sales_total as t_p, sales_br/sales_total as br_p from (select 
(select count(*) from sales where age >= ? and age < ? and itemName = 'apple') as sales_a,
(select count(*) from sales where age >= ? and age < ? and itemName = 'orange') as sales_o,
(select count(*) from sales where age >= ? and age < ? and itemName = 'banana') as sales_ba,
(select count(*) from sales where age >= ? and age < ? and itemName = 'tomato') as sales_t,
(select count(*) from sales where age >= ? and age < ? and itemName = 'bratwurst') as sales_br,
(select count(*) from sales where age >= ? and age < ? ) as sales_total) as gender_stats;`;
  connection.query(query,[lower,upper,lower,upper,lower,upper,lower,upper,lower,upper], function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });
  // process data here
  // run optimizer here
  // res.sendStatus(200)
});

router.get('/regression/age/bratwurst', (req, res) => {

  // query params
  console.log(req.query)

  query = `select *, x*slope + intersect as ynew from (select *, (xybar - xbar*ybar)/(x2bar - xbar*xbar) as slope, 
ybar - (xybar - xbar*ybar)/(x2bar - xbar*xbar)*xbar as intersect, pow((xybar - xbar*ybar)/sqrt((x2bar - xbar*xbar)*(y2bar - ybar*ybar)),2) as r2 from
(select * from ((select avg(x) as xbar, avg(y) as ybar, avg(xy) as xybar, avg(x2) as x2bar, avg(y2) as y2bar from
(select age as x, sum(qty) as y, age*sum(qty) as xy, age*age as x2, sum(qty)*sum(qty) as y2 from sales where itemName='bratwurst' group by age) as xy) as xybar join
(select age as x, sum(qty) as y, age*sum(qty) as xy, age*age as x2, sum(qty)*sum(qty) as y2 from sales where itemName='bratwurst' group by age) as xy2)) as xyall) as regression`;

  connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      responseMessage.stats = rows[0];
      res.send(responseMessage);
  });
  // process data here
  // run optimizer here
  // res.sendStatus(200)
});

router.post('/sales', (req, res) => {
  // query params
  console.log(req.body)

  var items = req.body.item;
  var age = req.body.buyer.age;
  var gender = req.body.buyer.gender;
  var mood = req.body.buyer.mood;
  for (var item in items){
      console.log(item);
      connection.query('insert into sales values (DEFAULT,?,?,?,?,?,DEFAULT)', [item, items[item], age, gender, mood], function(err, result) {
        if (err) throw err;
      });
  }

  // process data here
  // run optimizer here

  res.sendStatus(200);

});

export default router