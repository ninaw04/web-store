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

router.get("/checkout", (req, res) => {});

module.exports = router;