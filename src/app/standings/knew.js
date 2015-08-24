'use strict';

var fs = require('fs');
var request = require('request');

var url = 'https://www.pgatour.com/data/r/033/2015/field.json';

for(var i = 0; i<url.length; i++){
  console.log(url[i]);
}
