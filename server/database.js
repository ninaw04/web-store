// const config = require('../.userConfig')
// var mysql = require('mysql');
 
// const db = mysql.createPool( config.connect )

// // db.connect((err => {
// //     if(err) throw err;
// //     console.log('MySQL Connected');
// // }));

// exports.pool = db;
const { createConnectionPool, sql } = require('@matteo.collina/sqlite-pool');

const db = createConnectionPool('database/main.db');

exports.pool = db;