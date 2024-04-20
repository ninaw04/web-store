const config = require('../.userConfig')
var mysql = require('mysql');
 
const db = mysql.createConnection( config.connect )

db.connect((err => {
    if(err) throw err;
    console.log('MySQL Connected');
}));

exports.databaseConnection = db;