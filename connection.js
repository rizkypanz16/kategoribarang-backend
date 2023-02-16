const env = require('dotenv').config();
const mysql = require('mysql');

dbdata = {
  host: process.env.KATEGORI_DBHOST,
  user: process.env.KATEGORI_DBUSER,
  password: process.env.KATEGORI_DBPASSWORD,
  database: process.env.KATEGORI_DBNAME
}
var connection = mysql.createConnection(dbdata);
connection.connect(function(err){
    if (err) throw err
    console.log('connected successfully to DB ...');
});

module.exports = {
    connection : mysql.createConnection(dbdata)
}
