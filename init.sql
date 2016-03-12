drop database Salevision;

create database Salevision;
use SaleVision;

create table items(
    itemName char(26) primary key);

create table sales(
	saleID int(13) PRIMARY KEY AUTO_INCREMENT,
    itemName char(26) REFERENCES items.itemName,
    qty int(4),
    age int(2),
    gender varchar(1),
    expression varchar(10),
    saleDate datetime default current_timestamp );
    
insert into items values('apple');
insert into items values('orange');
insert into items values('banana');
insert into items values('tomato');
insert into items values('bratwurst');

insert into sales values(DEFAULT, 'apple', 1, 24, 'f', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'apple', 1, 30, 'f', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'apple', 1, 45, 'm', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'bratwurst', 1, 50, 'm', 'angry', DEFAULT);
insert into sales values(DEFAULT, 'bratwurst', 1, 18, 'f', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'bratwurst', 1, 24, 'm', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'bratwurst', 1, 23, 'f', 'happy', DEFAULT);
insert into sales values(DEFAULT, 'bratwurst', 1, 24, 'm', 'happy', DEFAULT);

select *, sales_m/sales_total as m_p, sales_f/sales_total as f_p from (select (select count(*) from sales where gender = 'f' and itemName = 'apple') as sales_f,
(select count(*) from sales where gender = 'm' and itemName = 'apple') as sales_m,
(select count(*) from sales where itemName = 'apple') as sales_total) as gender_stats;

select *, sales_age_u18/sales_total, sales_age_u30/sales_total, sales_age_u50/sales_total, sales_age_o50/sales_total,
sales_total as p_age_u18 from (select (select count(*) from sales where itemName = 'apple' and age <= 18) as sales_age_u18, 
(select count(*) from sales where itemName = 'apple' and age > 18 and age <= 30) as sales_age_u30, 
(select count(*) from sales where itemName = 'apple' and age > 31 and age <= 50) as sales_age_u50, 
(select count(*) from sales where itemName = 'apple' and age > 50) as sales_age_o50, 
(select count(*) from sales where itemName = 'apple') as sales_total) as sales_temp;

select gender_sales.gender, gender_sales.sales_c, sum(sales_c) from (select gender, count(*) as sales_c from sales where itemName in ('apple') group by gender) as gender_sales;


