const mysql2 = require("mysql2");

const dbconnection = mysql2.createConnection({
  user: "evangadi_form",         
  database: "evangadi_db",     
  host: "localhost",         //address of the database server
  password: "12345678",    
  connectionLimit: 10,
});

module.exports = dbconnection.promise();
