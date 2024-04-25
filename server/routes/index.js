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
      console.error("SQL ERROR /products");
      return
    }
    res.json(result);
  });
});
router.get("/products/product/:productId", (req, res) => {
  pool.query(`SELECT * FROM products WHERE productId = ${req.params.productId}`, function(err, result, fields) {
    if (err) {
      console.error("SQL ERROR products/:productId");
      return 
    }
    res.json(result);
  })
});

router.get("/products/search/:searchItem", (req, res) => {
  console.log(req.query);

  pool.query(`SELECT * FROM products WHERE productName LIKE '${req.params.searchItem}%'`, function(err, result, fields) {
    if (err) {
      console.error("SQL ERROR products/search/:searchItem");
      return 
    }
    console.log(result)
    res.json(result);
  })
});
//ASSUME THAT MINCOST AND MAXCOST ARE PROVIDED. By default they should be between 0 and the 1000 or something
router.get("/products/filter", (req, res) => {
  console.log(req.body);
  if (req.body.minCost && req.body.maxCost){ //if both minCost and maxCost are provided
    pool.query(`SELECT * FROM products WHERE price BETWEEN ${req.body.minCost} and ${req.body.maxCost}`, function(err, result, fields) {
      if (err) {
        console.error("SQL ERROR /products/filter");
        return 
      }
      console.log(result)
      res.json(result);
    })
  } 
  // console.log(req.query);

  
});

router.get("/checkout", (req, res) => {
  
})


module.exports = router;
