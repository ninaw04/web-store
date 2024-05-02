var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt");

router.use(cookieParser());

let pool = require("../database").pool;

router.get("/", function (req, res, next) {
  console.log("HEREERERERERERE");
  res.send("respond with a resource");
});

/* Make a new buyer */
router.post("/buyer", (req, res) => {
  const q = "INSERT INTO buyer (fName, lName) VALUES (?, ?)";
  const input = [req.body.fName, req.body.lName];

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    const id = data.insertId;
    return res.status(200).json({ id });
  });
});
router.post("/order", (req, res) => {
  console.log("length")
  console.log(typeof req.body.items);
  console.log(req.body.items.entries());
  var q = "INSERT INTO orders VALUES "
  for (const [key, value] of Object.entries(req.body.items)) {
    console.log(`${key}: ${value.buyerID}, ${value.productId}`);
    q += `(${value.buyerID}, ${value.productId}, now(), 0),`; // status 0 means not delivered 
  }
  console.log(q.substring(0, q.length - 1))
  // pool.query(q, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.status(200).json("Order successfully added");
  // });
  // // pool.query(`DELETE from cart where buyerId = ${req.body.buyerId}`, (err, data) => {
  // //   if (err) return res.json(err);
  // //   return res.status(200).json("Cart cleared succesfully");
  // // })
  
});

router.get('/order/:id', (req, res) => {
  const q = `SELECT * FROM orders WHERE buyerId = ${req.params.id}`
  console.log()

  pool.query(q, (err, data) =>{
    if (err) return err;
    return res.json(data);
  })
}) 

//Make a new user with login information
router.post("/user", async (req, res) => {
  const q = "INSERT INTO user (buyerID, email, password) VALUES (?, ?, ?)";
  const { id, email, password } = req.body;

  const input = [id, email, password];

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("User successfully added");
  });
});

//Add the new user's shipping address
router.post("/address", (req, res) => {
  const q =
    "INSERT INTO addresses (buyerID, country, streetAdd, aptNum, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const input = [
    req.body.id,
    req.body.country,
    req.body.streetAdd,
    req.body.aptNum,
    req.body.city,
    req.body.state,
    req.body.zip,
  ];

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("user`s address successfully added");
  });
});

//Log in operation
router.post("/login", (req, res) => {
  const q = "SELECT * FROM user WHERE email = ? AND password = ?";
  const { email, password } = req.body;
  const input = [email, password];

  pool.query(q, input, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      const buyerId = data[0].buyerID;
      console.log("log in successful with", buyerId);
      return res.json({ Status: "Success", id: buyerId });
    } else {
      return res.json({ Message: "Failed" });
    }
  });
});

/* GET buyer address */
router.get("/address/:id", (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM addresses WHERE buyerID = ${id}`;

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("address/:id", (req, res) => {
  const {id} = req.params;
  const {street, aptNumber, country, state, city, zipcode} = req.body;
  const q = `UPDATE addresses country = ?, streetAdd = ?, aptNum = ?, city = ?, state = ?, zip = ? WHERE buyerId = ?`;

  pool.query(q, country, street, aptNumber, city, state, zipcode, id, (err, data) => {
    if (err) return err;
    return res.json(data);
  })
})

//GET info of user
router.get('/info/:id', (req, res) => {
  const {id} = req.params;
  const q = `SELECT * FROM buyer WHERE buyerId = ${id}`;

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  })
})

/* GET cart */
router.get("/:id/cart", (req, res) => {
  // select cart and products from cart
  const { id } = req.params;
  const q = `SELECT * FROM cart LEFT JOIN products ON cart.productID = products.productID WHERE buyerID = ${id}`;

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/*POST item to cart*/
router.post("/cart", (req, res) => {
  // const { buyerId, productId } = ;
  // console.log(req.body);
  pool.query(
    `INSERT INTO cart VALUES(${req.body.buyerId}, ${req.body.productId}, ${req.body.amount}) ON DUPLICATE KEY UPDATE amount = ${req.body.amount}`,
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

// Delete from cart
router.delete("/cart/:buyerId/:productId", (req, res) => {
  pool.query(
    `DELETE FROM cart where buyerId = ${req.params.buyerId} and productId = ${req.params.productId}`,
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

// Add to cart
router.put("/cart", (req, res) => {
  pool.query(
    `UPDATE cart set amount = ${req.body.amount} where buyerId = ${req.body.buyerId} and productId = ${req.body.productId}`,
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

// Total items in cart for one buyer
router.get("/definite/total/cart/:buyerID", (req, res) => {
  console.log("total cart backend") // should console log here :((((
  pool.query(
    `SELECT SUM(amount) FROM cart WHERE buyerID = ${req.params.buyerID}`, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  )
})

module.exports = router;
