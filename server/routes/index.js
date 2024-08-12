var express = require("express");
var router = express.Router();
var cors = require("cors");
const { sql } = require("@matteo.collina/sqlite-pool");

router.use(cors());

const pool = require("../database").pool;

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("rarhhhhhhhh");
  res.json("addresbackend for muscle mommies :)))");
});

/* GET products */
router.get("/products", (req, res) => {
  const query = sql`select * from products;`;
  pool
    .query(query)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error("SQL ERROR GET /products", err);
      res.status(500).send("Internal Server Error");
    });
});
router.get("/products/product/:productId", (req, res) => {
  pool.query(
    sql`SELECT * FROM products WHERE productId = ${req.params.productId}`).then(
      (result) => res.json(result)
    ).catch((err => {
      console.error("SQL ERROR products/:productId");
      return;
    }))
});

//ASSUME THAT MINCOST AND MAXCOST ARE PROVIDED. By default they should be between 0 and the 1000 or something
router.get("/products/filter/:min/:max", (req, res) => {
  if (req.params.min && req.params.max) {
    //if both minCost and maxCost are provided
    pool
      .query(
        sql`SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max}`
      )
      .then(
        // if (err) {
        //   console.error("SQL ERROR /products/filter");
        //   return;
        // }
        (results) => res.json(results)
      )
      // console.log(result);
      // res.json(result);
      .catch((err) => {
        console.error("SQL ERROR /products/filter");
        res.status(500).send("Internal Server Error");
      });
  }
  console.log(req.query);
});

router.get("/products/filter/:min/:max/:search", (req, res) => {
  const { min, max, search } = req.params;
  console.log("filter/min/max/search searched");

  if (min && max && search) {
    const query = sql`SELECT * FROM products WHERE price BETWEEN ${min} AND ${max} AND productName LIKE ${`%${search}%`}`;
    const params = [min, max, `%${search}%`];

    pool
      .query(query)
      .then((results) => res.json(results))
      .catch((err) => {
        console.error("SQL ERROR /products/filter/:min/:max/:search", err);
        res.status(500).send("Internal Server Error");
      });
  } else {
    res.status(400).send("Bad Request: Missing required parameters");
  }
});

router.get("/products/filter/:min/:max/:category/:search", (req, res) => {
  console.log("sure");
  if (req.params.min && req.params.max && req.params.search) {
    //if both minCost and maxCost are provided

    pool
      .query(
        sql`SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max} AND category LIKE ${`%${req.params.category}%`} AND productName LIKE ${`%${req.params.search}%`}`
      )
      .then((results) => res.json(results))
      .catch((err) => {
        console.error(
          "SQL ERROR /products/filter/:min/:max/:category/:search",
          err
        );
        res.status(500).send("Internal Server Error");
      });
  }
});

router.get("/products/category/filter/:min/:max/:category", (req, res) => {
  console.log("filter/min/max/category searched");
  const { min, max, category } = req.params;
  const query = sql`SELECT * FROM products WHERE price BETWEEN ${min} and ${max} AND category like ${`%${category}%`}`;
  pool
    .query(query)
    .then((results) => res.json(results))
    .catch((err) => {
      console.error("SQL ERROR filtering by category/:category", err);
      return;
    });
});

router.get("/checkout", (req, res) => {});

module.exports = router;
