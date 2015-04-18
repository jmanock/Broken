'use strict';
var request = require('request');
var cheerio = require('cheerio');

// Gets all the players links for the score card pages
// request('https://sports.yahoo.com/golf/pga/leaderboard', function(error, response, body){
// 	if(!error && response.statusCode === 200){
// 		var $ = cheerio.load(body);
// 		// Gets all the players links to the score card page
// 		$('.player > a').each(function(i, element){
// 			var a = $(this);
// 			var b = a.attr('href');
// 			// Prints out all the links with index numbers
// 			console.log(i + ' ' + b);
//
// 			// Prints out all the players
// 			console.log(i + a.text());
// 		});
// 	}
// });

// Test to get all pages open
var url = 'https://sports.yahoo.com/golf/pga/leaderboard',
words = [],
results = 0;

function callBack(){
	results = results + 1;
	//console.log(words);

}
request(url, function(error, response, body){
	if(!error){
		var $ = cheerio.load(body),
		links = $('.player > a');

		links.each(function(i, link){
			var urls = $(link).attr('href'),
			pages = ('https://sports.yahoo.com'+urls);
			//results++;

			request(pages, function(error, response, body){
				if(!error){
					var $t = cheerio.load(body),
					text = $t('h1').text();
					// words.push(text);
					 console.log(i + ' ' + text);
				}
			});
			callBack();
		});
	}
});
