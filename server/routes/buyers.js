var express = require('express');
var router = express.Router();

let pool = require('../database').pool

router.get('/', function(req, res, next) {
  console.log("HEREERERERERERE")
  res.send('respond with a resource');
});

/* Make a new user */
router.post('/', (req, res) => {
  const q = 'INSERT INTO Buyer (`fName`, `lName`) VALUES (?)'
  const values = [
    req.body.fName,
    req.body.lName
  ]

  pool.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("User has been created")
})
})

/* GET specific buyer */
router.get('/:id', (req,res) => {
  const {id} = req.params
  const q = `SELECT * FROM Buyer WHERE buyerID = ${id}`

  pool.query(q, (err, data) => {
      if(err) return res.json(err)
      return res.json(data)
  })
})

/* GET buyer address */
router.get('/:id/address', (req, res) => {
  const {id} = req.params
  const q = `SELECT * FROM addresses WHERE buyerID = ${id}`

  pool.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
})
})

/* GET cart */
router.get('/:id/cart', (req, res) => {
  // select cart and products from cart
  const {id} = req.params
  const q = `SELECT * FROM Cart LEFT JOIN Product
            ON Cart.productID = Product.productID
            WHERE buyerID = ${id}`

  pool.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

module.exports = router;
