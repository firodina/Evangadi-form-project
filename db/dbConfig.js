const mysql2 = require("mysql");

const dbconnection = mysql2.createPool({
  user:process.env.USER,
  database:  process.env.DATABASE,     
  host: process.env.LOCALHOST ,         //address of the database server
  password:process.env.PASSWORD ,    
  connectionLimit: 10,
});

module.exports = dbconnection;
