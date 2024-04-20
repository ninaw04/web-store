var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());

let connection = require('../database').databaseConnection

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET products */
router.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) {
      console.error("Could not fetch data from products table");
    }
    res.json(result);
  });
});


module.exports = router;