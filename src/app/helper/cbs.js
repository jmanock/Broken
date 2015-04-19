'use strict';
var cheerio = require('cheerio');
var request = require('request');
var url = 'https://sports.yahoo.com/golf/pga/leaderboard';

request(url, function(error, response, body){
  if(!error && response.statusCode === 200){
    console.log('We have conection to the website');
    var $ = cheerio.load(body);
    var links = $('.player > a');

    links.each(function(i, link){
      var urls = $(link).attr('href');
      var pages = ('https://sports.yahoo.com' + urls);

      request(pages, function(error, response, body){
        if(!error && response.statusCode === 200){
          //console.log('we have another connection to all the other pages!');
          var $page = cheerio.load(body);
          var text = $page('h1').text();
          var eagle = $page('.eagle').text();
          var birdie = $page('.birdie').text();
          var bogie = $page('.bogey').text();
          var double = $page('.dblbogey').text();
          var data ={
            Name: text,
            Points: eagle.length * 3 + birdie.length * 1 + bogie.length * -1 + double.length * -2
          };
          console.log(data.Points);
        }
      });
    });
  }
});
