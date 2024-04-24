var express = require('express');
var router = express.Router();

let pool = require('../database').pool

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
