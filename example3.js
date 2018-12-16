/***************************************************************/
/* Example 3 - Create Dat & Save Key To Hypercore Feeds File   */
/***************************************************************/
const express = require("express");
const app = express();
const fs = require('fs');
const Dat = require('dat-node');
const port = 3000;

// GET instead of POST for demonstration purposes
// In actual use we would be processing form data from req.body
app.get("/", createDat, (req, res) => {
  let jsonResponse = {
    data: res.locals.data
  };
  res.json(jsonResponse);
});

app.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});

function createDat(req, res, next) {

  // mock input from req.body
  let record = require('./data/example3.json');

  // create dat directory path with name matching record._id
  const datDir = `./dats/${record._id}`;

  // see if dat directory path exists
  const datDirExists = fs.existsSync(datDir);

  // if dat directory does not exist, create it
  if (!datDirExists) { fs.mkdirSync(datDir) }

  // create destination file path
  const destFilePath = `${datDir}/data.json`;

  // write new/updated data to directory in readable json
  fs.writeFileSync(destFilePath, JSON.stringify(record, null, 2));

  // create dat with directory
  // see module documentation: https://www.npmjs.com/package/dat-node#example
  
  Dat(datDir, function (err, dat) {
    if (err) throw err
   
    // import the files
    dat.importFiles();

    // get dat key
    let datKey = dat.key.toString('hex');

    // update record with new dat key
    record.datKey = datKey;

    // save updated record
    fs.writeFileSync(destFilePath, JSON.stringify(record, null, 2));

    // open hypercored feeds file as string
    let feeds = fs.readFileSync('./data/feeds', 'utf8');

    // add dat key to hypercored feeds file
    feeds += `\ndat://${datKey}`;    

    // save feeds file
    fs.writeFileSync('./data/feeds', feeds);

    // share the files on the network, hypercored 
    dat.joinNetwork();

    // set res.locals to new data
    res.locals.data = record;
    
    // proceed
    next();

  })

}
