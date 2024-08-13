var express = require("express");
var router = express.Router();
var cors = require("cors");
const { RouterSharp } = require("@mui/icons-material");
router.use(cors());

let pool = require("../database").pool;

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("rarhhhhhhhh");
  res.json("addresbackend for muscle mommies :)))");
});

router.get("/checkout", (req, res) => {});

module.exports = router;
