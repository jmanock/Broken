'use strict';
var fs = require('fs');
var request = require('request');

var urls = new Array('http://www.pgatour.com/data/r/033/field.json');

function scrape(url, file){
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      console.log('request Url: ' +url);
      console.log('request file: ' + file);
      fs.writeFile(file, body);
    }
  });
}
for(var i = 0; i<urls.length; i++){
  var file = 'log'+[i]+'.json';
  var url = urls[i];

  console.log(url);
  console.log(file);
  scrape(url,file);
}
