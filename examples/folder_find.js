#!/usr/bin/env node

var settings = require('../settings.js');
var benchling = require('../index.js')(1, settings.apiKey);

function fail(err) {
  if(err) console.error(err);
  process.exit(1);
}

// find all folders containing the string 'pSB'
benchling.folder.list({query: 'pSB'}, function(err, res) {
  if(err) fail(err);
  if(!res || !res.folders) fail(new Error("no folders returned by server"));

  var folderNames = res.folders.map(function(folder) {
    return folder.name;
  });

  console.log(JSON.stringify(folderNames, null, 2));
});
