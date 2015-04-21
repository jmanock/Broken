'use strict';
var request = require('request');
var cheerio = require('cheerio');
var url  = 'https://sports.yahoo.com/golf/pga/leaderboard';
var count = 0;

function pages(){
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var links = $('.player > a');

      links.each(function(i, link){
        var urls = $(link).attr('href');
        var page = ('https://sports.yahoo.com'+urls);
        req(page, i);
      });
    }
  });
}

function req(page, i){
  request(page, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var name = $('h1').text();
      var data = {
        Name: name
      };
      console.log(i + ' ' + data.Name);
      if(data.Name === ''){
        req(page);
        count ++;
      }
    }
  });
}


pages();
