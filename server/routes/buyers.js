var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt");
const { sql } = require("@matteo.collina/sqlite-pool");

router.use(cookieParser());

let pool = require("../database").pool;

router.get("/", function (req, res, next) {
  console.log("HEREERERERERERE");
  res.send("respond with a resource");
});

/* Make a new buyer */
router.post("/buyer", (req, res) => {
  //updated to new sqlite
  const q = sql`INSERT INTO buyer (fName, lName) VALUES (${req.body.fName}, ${req.body.lName})`;
  pool
    .query(q)
    .then(() => {
      return pool.query(sql`select last_insert_rowid() as id;`);
    })
    .then((results) => {
      console.log(results);
      const id = results[0].id;
      console.log(id);
      return res.json({ id });
    })
    .catch((err) => {
      return res.json(err);
    });
});
router.post("/order", (req, res) => {
  //untested but converted code
  let q =
    "INSERT INTO orders (buyerID, productId, boughtDate, orderStatus, amount) VALUES ";
  for (const [key, value] of Object.entries(req.body.orders)) {
    console.log(`${key}: ${value.buyerID}, ${value.productId}`);
    q += `(${value.buyerID}, ${value.productId}, datetime('now'), 0, ${value.amount}),`;
  }

  // Remove the trailing comma and add a semicolon to complete the query
  q = q.slice(0, -1) + ";";
  console.log(`query to send: ${q}`);
  const query = sql`${q}`;
  pool
    .query(query)
    .then((data) => {
      console.log("added to orders");
      console.log(req.body.buyerId);

      return pool.query(
        sql`DELETE FROM cart WHERE buyerId = ${req.body.buyerId}`
      );
    })
    .then((data) => {
      console.log("Cart cleared");
      return res.status(200).json("Order added and cart deleted!");
    })
    .catch((err) => {
      console.error("SQL ERROR /order", err);
      return res.status(500).send("Internal Server Error");
    });
});

router.get("/order/:id", (req, res) => {
  const q = sql`SELECT * FROM orders WHERE buyerId = ${req.params.id}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /order/:id", err);
      return res.status(500).send("Internal Server Error");
    });
});

//Make a new user with login information
router.post("/user", async (req, res) => {
  // updated to sqlite
  const { id, email, password } = req.body;
  const q = sql`INSERT INTO user (buyerID, email, password) VALUES (${id}, ${email}, ${password})`;

  pool
    .query(q)
    .then((result) => res.status(200).json("User successfully added"))
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/:email", (req, res) => {
  const q = sql`SELECT * FROM user WHERE email = ${req.params.email}`;

  pool
    .query(q)
    .then((data) => {
      if (data.length > 0) {
        return res.json({ Status: "dup" });
      } else {
        return res.json({ Status: "no dup" });
      }
    })
    .catch((err) => {
      console.error("SQL ERROR /:email", err);
      return res.status(500).send("Internal Server Error");
    });
});

//Add the new user's shipping address
router.post("/address", (req, res) => {
  const q = sql`INSERT INTO addresses (buyerID, country, streetAdd, aptNum, city, state, zip) VALUES (${req.body.id}, ${req.body.country}, ${req.body.streetAdd}, ${req.body.aptNum}, ${req.body.city}, ${req.body.state}, ${req.body.zip})`;

  pool
    .query(q)
    .then((data) => {
      return res.status(200).json("user's address successfully added");
    })
    .catch((err) => {
      console.error("SQL ERROR /address", err);
      return res.status(500).send("Internal Server Error");
    });
});

// POST login
router.post("/login", (req, res) => {
  const q = sql`SELECT * FROM user WHERE email = ${req.body.email} AND password = ${req.body.password}`;

  pool
    .query(q)
    .then((data) => {
      if (data.length > 0) {
        const buyerId = data[0].buyerID;
        console.log("log in successful with", buyerId);
        return res.json({ Status: "Success", id: buyerId });
      } else {
        return res.json({ Message: "Failed" });
      }
    })
    .catch((err) => {
      console.error("SQL ERROR /login", err);
      return res.status(500).send("Internal Server Error");
    });
});

/* GET buyer address */
router.get("/address/:id", (req, res) => {
  console.log("getting id");
  const q = sql`SELECT * FROM addresses WHERE buyerID = ${req.params.id}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /address/:id", err);
      return res.status(500).send("Internal Server Error");
    });
});

router.post("/address/:id", (req, res) => {
  console.log("updated");
  const { street, aptNumber, country, state, city, zipcode } = req.body;
  console.log(street, aptNumber, country, state, city, zipcode);
  const q = sql`UPDATE addresses SET country = ${country}, streetAdd = ${street}, aptNum = ${aptNumber}, city = ${city}, state = ${state}, zip = ${zipcode} WHERE buyerId = ${req.params.id}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /address/:id", err);
      return res.status(500).send("Internal Server Error");
    });
});

// GET info of user
router.get("/info/:id", (req, res) => {
  const q = sql`SELECT * FROM buyer WHERE buyerId = ${req.params.id}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      console.error("SQL ERROR /info/:id", err);
      return res.status(500).send("Internal Server Error");
    });
});

/* GET cart */
router.get("/:id/cart", (req, res) => {
  const q = sql`SELECT * FROM cart LEFT JOIN products ON cart.productID = products.productID WHERE buyerID = ${req.params.id}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /:id/cart", err);
      return res.status(500).send("Internal Server Error");
    });
});

/* POST item to cart */
router.post("/cart", (req, res) => {
  const q = sql`INSERT INTO cart (buyerId, productId, amount) VALUES (${req.body.buyerId}, ${req.body.productId}, ${req.body.amount}) ON CONFLICT(buyerId, productId) do update set amount = ${req.body.amount}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /cart", err);
      return res.status(500).send("Internal Server Error");
    });
});

// DELETE from cart
router.delete("/cart/:buyerId/:productId", (req, res) => {
  const q = sql`DELETE FROM cart WHERE buyerId = ${req.params.buyerId} AND productId = ${req.params.productId}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /cart/:buyerId/:productId", err);
      return res.status(500).send("Internal Server Error");
    });
});

// PUT (update) cart
router.put("/cart", (req, res) => {
  const q = sql`UPDATE cart SET amount = ${req.body.amount} WHERE buyerId = ${req.body.buyerId} AND productId = ${req.body.productId}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /cart", err);
      return res.status(500).send("Internal Server Error");
    });
});

// GET total items in cart for one buyer
router.get("/definite/total/cart/:buyerID", (req, res) => {
  // console.log("total cart backend");
  const q = sql`SELECT SUM(amount) AS sum FROM cart WHERE buyerID = ${req.params.buyerID}`;

  pool
    .query(q)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error("SQL ERROR /definite/total/cart/:buyerID", err);
      return res.status(500).send("Internal Server Error");
    });
});
module.exports = router;
