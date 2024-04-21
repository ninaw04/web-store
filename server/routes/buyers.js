var express = require('express');
var router = express.Router();

let pool = require('../database').pool

/* GET users listing. */
// pool.getConnection((err, connection) => {
//   if (err) throw err;

//   connection.query('/', (err, result) => {
//     if(err) throw err;
//     res.send('respond with a resource');

//     connection.release();
//   });
// })
router.get('/', function(req, res, next) {
  console.log("HEREERERERERERE")
  res.send('respond with a resource');
});

/* GET specific buyer */
router.get('/', (req,res) => {

})

/* GET cart */
router.get('/:id/cart', (req, res) => {

})

module.exports = router;
