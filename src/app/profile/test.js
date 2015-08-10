'use strict';

var request = require('request');

var url = 'http://www.pgatour.com/data/r/033/leaderboard-v2.json';

request(url, function(error, response, body){
  if(!error && response.statusCode === 200){
    console.log(body);
  }
});
