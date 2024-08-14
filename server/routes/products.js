var express = require("express");
var router = express.Router();
const { sql } = require("@matteo.collina/sqlite-pool");

let pool = require("../database").pool;

/* GET products */
router.get("/", (req, res) => {
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
  router.get("/product/:productId", (req, res) => {
    pool.query(
      sql`SELECT * FROM products WHERE productId = ${req.params.productId}`).then(
        (result) => res.json(result)
      ).catch((err => {
        console.error("SQL ERROR products/:productId");
        return;
      }))
  });
  
  router.get("/filter", (req, res) => {
    console.log("sure");
    console.log(req.query)
    const { min, max, search, category } = req.query;
    if(search && category) { // How to change to catch everything at once?
      pool.query(
          sql`SELECT * FROM products WHERE price BETWEEN ${min} and ${max} AND category LIKE ${`%${category}%`} AND productName LIKE ${`%${search}%`}`
        )
        .then((results) => res.json(results))
        .catch((err) => {
          console.error(
            "SQL ERROR search and category",
            err
          );
          res.status(500).send("Internal Server Error");
        });
    } else if (category) {
        pool.query(
            sql`SELECT * FROM products WHERE price BETWEEN ${min} and ${max} AND category like ${`%${category}%`}`
        )
        .then((results) => res.json(results))
        .catch((err) => {
          console.error(
            "SQL ERROR category",
            err
          );
          res.status(500).send("Internal Server Error");
        });
    } else if (search) {
        pool.query(
            sql`SELECT * FROM products WHERE price BETWEEN ${min} and ${max} AND productName LIKE ${`%${search}%`}`
        )
        .then((results) => res.json(results))
        .catch((err) => {
          console.error(
            "SQL ERROR search",
            err
          );
          res.status(500).send("Internal Server Error");
        });
    } else {
        pool.query(
            sql`SELECT * FROM products WHERE price BETWEEN ${min} and ${max}`
        )
        .then((results) => res.json(results))
        .catch((err) => {
          console.error(
            "SQL ERROR min and max only",
            err
          );
          res.status(500).send("Internal Server Error");
        });
    }
  });
  
  module.exports = router;