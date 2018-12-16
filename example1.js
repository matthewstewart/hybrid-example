/**********************************/
/* Example 1 - Express Middleware */
/**********************************/
const express = require("express");
const app = express();
const port = 3000;

app.get("/", firstMiddleware, secondMiddleware, (req, res) => {
  let jsonResponse = {
    message: "This is a simple JSON API route example.",
    data: res.locals.data
  };
  res.json(jsonResponse);
});

app.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});

function firstMiddleware(req, res, next) {
  // data can be passed through res.locals
  res.locals.data = "Foo";
  next();
}

function secondMiddleware(req, res, next) {
  res.locals.data = res.locals.data + "bar";
  next();
}
