var path = require("path");

const express = require("express")
const app = express();
const cors = require("cors");
var cookieParser = require('cookie-parser');
//const PORT = 8800;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/buyers");
var productsRouter = require("./routes/products");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/buyers", usersRouter);

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
  res.json("error");
});

// app.listen(PORT, () => {
//   console.log(`connected on http://localhost:${PORT}`)
// })

module.exports = app;