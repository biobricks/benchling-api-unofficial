#!/usr/bin/env node

var settings = require('../settings.js');
var benchling = require('../index.js')(1, settings.apiKey);

function fail(err) {
  if(err) console.error(err);
  process.exit(1);
}

benchling.sequence.list(function(err, res) {
  if(err) fail(err);

  console.log(JSON.stringify(res, 2));
  
});
