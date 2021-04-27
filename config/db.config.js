const mysql = require('mysql');

//mysql connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'easybar'
});

dbConn.connect(function (err){
  if(err) throw err;
  console.log('Database Connected Successfully!');
});

module.exports = dbConn;