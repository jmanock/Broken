'use strict';
var request = require('request');
var cheerio = require('cheerio');

request('http://www.cbssports.com/golf/leaderboard/pga-tour/292758/masters-tournament', function(err, response, body){
  if(!err && response.statusCode === 200){
    var $ = cheerio.load(body);

    /* This get the players list*/
    // $('.pName').each(function(i, element){
    //   var name = $(this).text();
    //   //console.log(name);
    // });

    var name = $('a').html();
    console.log(name);
  }
});
