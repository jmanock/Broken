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
var url = 'https://sports.yahoo.com/golf/pga/leaderboard';
var something = [];


function callBack(){


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
					score = 0,
					text = $t('h1').text(),
					birdie = $t('.birdie').text(),
					dblbogey = $t('.dblbogey').text(),
					eagle = $t('.eagle').text(),
					bogie = $t('.bogey').text();

					// birdie = score + 1;
					// bogie = score -1;
					// dblbogey = score -2;
					// eagle = score + 3;
					var data = {
						Name: text,
						Birdies:birdie.length * 1,
						Bogies: bogie.length * -1,
						eagle: eagle.length * 3,
						db: dblbogey.length * -2,
						points: birdie.length*1 + bogie.length * -1 + eagle.length * 3 + dblbogey.length * -2 
					};

					// Score gets updated by birdie and bogies
					console.log( data);

				}
			});
			//callBack();
		});
	}
});
