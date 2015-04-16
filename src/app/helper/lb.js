'use strict';
var request = require('request');
var cheerio = require('cheerio');

request('http://espn.go.com/golf/leaderboard', function(error, response, html){
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(html);
    // Gets all the players names
    $('td.player').each(function(i, element){
      var a = $(this);
      //console.log(a.text() + ' ' + i);
    });

    // Working on the hole by hole scores
  $('tr.sl').each(function(i, element){
    var a = $(this).addClass('expanded');
  //  console.log(a + ' ' + i);
  })
  }
});

// request('https://news.ycombinator.com', function(error, response, html){
//   if(!error && response.statusCode ===200){
//     var $ = cheerio.load(html);
//     $('span.comhead').each(function(i, element){
//       var a = $(this).prev();
//       console.log(i + ' ' + a.text());
//     });
//   }
//});
