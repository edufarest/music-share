// Connect to the database

var mysql = require('mysql');

require('dotenv').config();

let user = process.env.DBUSER;
let password = process.env.DBPASSWORD;

var connection = mysql.createConnection({
    host    : 'localhost',
    user    :  user,
    password:  password,
    database: 'musicshare',
    multipleStatements: true,
});

connection.connect();

// TEST CONNECTION

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end()

// TEST CONNECTION END

module.exports = connection;