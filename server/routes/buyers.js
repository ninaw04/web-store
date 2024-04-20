var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET specific buyer */
router.get('/', (req,res) => {

})

/* GET cart */
router.get('/:id/cart', (req, res) => {

})

module.exports = router;
