/***********************************/
/* Example 4 - Get Record From Dat */
/***********************************/
const express = require("express");
const app = express();
const fs = require('fs');
const Dat = require('dat-node');
const port = 3000;

app.get("/", getDat, (req, res) => {
  let jsonResponse = {
    errorMessage: res.locals.errorMessage || null,
    error: res.locals.error || null,
    data: res.locals.data
  };
  res.json(jsonResponse);
});

app.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});

function getDat(req, res, next) {

  // mock input from req.body
  let record = require('./data/example4.json');

  // set temporary directory path
  const tmpDir = './tmp';

  // create the temporary directory if it doesn't exist
  if (!fs.existsSync(tmpDir)) { fs.mkdirSync(tmpDir); }

  // get dat with records dat key
  // temp option set to true to prevent .dat metadata
  // sparse option set to true as we are seeking to retrieve one json file
  // see module documentation: https://www.npmjs.com/package/dat-node#usage
  Dat(tmpDir, {temp: true, sparse: true, key: record.datKey}, function (err, dat) {
    // if error generating dat download
    if (err) {
      // set readable error message to res.locals
      res.locals.errorMessage = 'An error occurred during your request.';
      // pass the actual error to res.locals
      res.locals.error = err;
      // proceed
      next();    
    }
    // if no error generating dat download,
    // initiate join network with callback
    dat.joinNetwork(function (err) {
      // if error joining network
      if (err) {
        // set readable error message to res.locals
        res.locals.errorMessage = 'An error occurred during joining the p2p network.';
        // pass the actual error to res.locals
        res.locals.error = err;
        // proceed
        next();    
      }
      
      // catch if the network did not connect or key not distributed
      // at this point the user is getting no data so we fallback to... 
      // centralized to create the data, save to mongoDB, plus generate dat as in example 3
      if (!dat.network.connected || !dat.network.connecting) {
        res.locals.errorMessage = 'Could not find the information you requested on the p2p network, calling the centralized API to remedy that...';
      } else {
        // download data.json via the hyperdrive API
        dat.archive.readFile('/data.json', function (err, data) {
          // set the files content to res.locals
          res.locals.data = JSON.parse(data.toString());
          // proceed
          next();
        });
      }

    })
  });

}
