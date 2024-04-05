var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const cors = require("cors");
app.use(express.static(path.join(__dirname, "public")));
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "",
  user: "",
  port: ,
  password: "",
  database: "",
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(cors());
// console.log("here");
connection.connect(function (err) {
  console.log("Might be errro");
  if (err) throw err;
  console.log("You are now connneecetedfse");
});
// catch 404 and forward to error handler
app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) {
      console.error("Could not fetch data from products table");
    }
    res.json(result);
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
