const config = require('../.userConfig')
var mysql = require('mysql');
 
const db = mysql.createPool( config.connect )

// db.connect((err => {
//     if(err) throw err;
//     console.log('MySQL Connected');
// }));

exports.pool = db;