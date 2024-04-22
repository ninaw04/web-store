var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());

let pool = require('../database').pool

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("rarhhhhhhhh")
  res.json("backend for muscle mommies :)))")
  // res.render("index", { title: "Express" });
});

/* GET products */
router.get("/products", (req, res) => {
  pool.query("SELECT * FROM products", function (err, result, fields) {
    if (err) {
      console.error("Could not fetch data from products table");
      return
    }
    res.json(result);
  });
});


router.get("/checkout", (req, res) => {
  
})


module.exports = router;
