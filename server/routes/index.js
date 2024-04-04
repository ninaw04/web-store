var express = require("express");
var router = express.Router();
// const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  // console.log("something")
});

module.exports = router;
