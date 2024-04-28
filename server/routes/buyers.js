var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');

router.use(cookieParser());

let pool = require('../database').pool

router.get('/', function(req, res, next) {
  console.log("HEREERERERERERE")
  res.send('respond with a resource');
});

/* Make a new buyer */
router.post('/buyer', (req, res) => {
  const q = 'INSERT INTO buyer (fName, lName) VALUES (?, ?)'
  const input = [req.body.fName, req.body.lName]

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    const id = data.insertId;
    return res.status(200).json({ id }); 
  });
});

//Make a new user with login information
router.post('/user', async (req, res) => {
  const q = 'INSERT INTO user (buyerID, email, password) VALUES (?, ?, ?)'
  const {id, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword)
  const input = [id, email, password]

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json('User successfully added');
  })
})

//Add the new user's shipping address
router.post('/address', (req, res) => {
  const q = 'INSERT INTO addresses (buyerID, country, streetAdd, aptNum, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?)'
  const input = [req.body.id, req.body.country, req.body.streetAdd, req.body.aptNum, req.body.city, req.body.state, req.body.zip]

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json('user`s address successfully added')
  })
})

//Log in operation
router.post('/login', (req, res) => {
  const q = 'SELECT * FROM user WHERE email = ? AND password = ?'
  const {email, password} = req.body
  const input = [email, password]

  pool.query(q, input, async (err, data) => {
    if (err) return res.json(err);
    if(data.length > 0) {
      //const valid = await bcrypt.compare(password, data[0].password)
      const buyerId = data[0].buyerID
      console.log('log in successful with', buyerId)
      return res.json({Status: "Success", id: buyerId})
      // if (valid) {
      //   return res.json({status: "Success", id: buyerId})
      // } 
    } else {
      return res.json({Message: "No Records existed"});
    }
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
