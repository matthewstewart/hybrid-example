/********************************************************/
/* Example 2 - Express Middleware With File System (FS) */
/********************************************************/
const express = require("express");
const app = express();
const fs = require('fs');
const port = 3000;

app.get("/", readAppendSave, (req, res) => {
  let jsonResponse = {
    data: res.locals.data
  };
  res.json(jsonResponse);
});

app.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});

function readAppendSave(req, res, next) {
  // read using fs.readFileSync
  // a buffer object is returned unless 'utf8' is included as a second parameter
  let fileContent = fs.readFileSync('./data/example2.txt', 'utf8');
  // append a new line and some content
  fileContent += '\nFoobar';
  // save the updated content to the file
  fs.writeFileSync('./data/example2.txt', fileContent);
  // set the data to res.locals
  res.locals.data = fileContent;
  // proceed
  next();
}
