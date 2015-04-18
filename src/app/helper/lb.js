'use strict';
var request = require('request');
var cheerio = require('cheerio');

// Gets all the players links for the score card pages
request('https://sports.yahoo.com/golf/pga/leaderboard', function(error, response, body){
	if(!error && response.statusCode === 200){
		var $ = cheerio.load(body);
		// Gets all the players links to the score card page
		$('.player > a').each(function(i, element){
			var a = $(this);
			var b = a.attr('href');
			// Prints out all the links with index numbers
			console.log(i + ' ' + b);

			// Prints out all the players
			console.log(i + a.text());
		});
	}
});
