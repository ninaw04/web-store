var express = require("express");
var router = express.Router();
var cors = require("cors");
const { RouterSharp } = require("@mui/icons-material");
router.use(cors());

let pool = require("../database").pool;

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("rarhhhhhhhh");
  res.json("backend for muscle mommies :)))");
});

/* GET products */
router.get("/products", (req, res) => {
  pool.query("SELECT * FROM products", function (err, result, fields) {
    if (err) {
      console.error("SQL ERROR /products");
      return;
    }
    res.json(result);
  });
});
router.get("/products/product/:productId", (req, res) => {
  pool.query(
    `SELECT * FROM products WHERE productId = ${req.params.productId}`,
    function (err, result, fields) {
      if (err) {
        console.error("SQL ERROR products/:productId");
        return;
      }
      res.json(result);
    }
  );
});

// router.get("/products/search/:searchItem", (req, res) => {
//   pool.query(
//     `SELECT * FROM products WHERE productName LIKE '${req.params.searchItem}%'`,
//     function (err, result, fields) {
//       if (err) {
//         console.error("SQL ERROR products/search/:searchItem");
//         return;
//       }
//       console.log(result);
//       res.json(result);
//     }
//   );
// });
//ASSUME THAT MINCOST AND MAXCOST ARE PROVIDED. By default they should be between 0 and the 1000 or something
router.get("/products/filter/:min/:max", (req, res) => {
  if (req.params.min && req.params.max) {
    //if both minCost and maxCost are provided
    pool.query(
      `SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max}`,
      function (err, result, fields) {
        if (err) {
          console.error("SQL ERROR /products/filter");
          return;
        }
        console.log(result);
        res.json(result);
      }
    );
  }
  console.log(req.query);
});

router.get("/products/filter/:min/:max/:search", (req, res) => {
  if (req.params.min && req.params.max && req.params.search) {
    //if both minCost and maxCost are provided
    pool.query(
      `SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max} AND productName LIKE '%${req.params.search}%'`,
      function (err, result, fields) {
        if (err) {
          console.error("SQL ERROR /products/filter/:min/:max/:search");
          return;
        }
        console.log(result);
        res.json(result);
      }
    );
  }
});

router.get("/products/filter/:min/:max/:category/:search", (req, res) => {
  console.log("sure");
  if (req.params.min && req.params.max && req.params.search) {
    //if both minCost and maxCost are provided
    pool.query(
      `SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max} AND category LIKE '%${req.params.category}%' AND productName LIKE '%${req.params.search}%'`,
      function (err, result, fields) {
        if (err) {
          console.error(
            "SQL ERROR /products/filter/:min/:max/:category/:search"
          );
          return;
        }
        console.log(result);
        res.json(result);
      }
    );
  }
});

router.get("/products/category/filter/:min/:max/:category", (req, res) => {
  console.log("pls god");
  pool.query(
    `SELECT * FROM products WHERE price BETWEEN ${req.params.min} and ${req.params.max} AND category like '%${req.params.category}%'`,
    function (err, result, fields) {
      if (err) {
        console.error("SQL ERROR filtering by category/:category");
        return;
      }
      //console.log(result)
      res.json(result);
    }
  );
});

router.get("/checkout", (req, res) => {});

module.exports = router;
