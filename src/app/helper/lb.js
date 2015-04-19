'use strict';
function points(){
var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('firebase');
var url = 'https://sports.yahoo.com/golf/pga/leaderboard';
var ref = new Firebase('https://fireseedangular.firebaseio.com');
var golfers = [];

	request(url, function(error, response, body){
		if(!error && response.statusCode === 200){
			console.log('we got something good here');
			var $ = cheerio.load(body);
			var links = $('.player > a');

			links.each(function(i, link){
				var urls = $(link).attr('href');
				var pages = ('https://sports.yahoo.com' + urls);

				request(pages, function(error, response, body){
					if(!error && response.statusCode === 200){
						var $page = cheerio.load(body);
						var text = $page('h1').text();
						var eagle = $page('.eagle').text();
						var birdie = $page('.birdie').text();
						var bogey = $page('.bogey').text();
						var double = $page('.dblbogey').text();

						 var data = {
							Name: text,
							Eagles: eagle.length * 3,
							Birdies: birdie.length * 1,
							Bogey: bogey.length * -1,
							Double: double.length * -2,
							Points: eagle.length * 3 + birdie.length * 1 + bogey.length * -1 + double.length * -2
						};
						golfers.push(data);
						//ref.set(golfers);
						console.log(data);
					}
				});
			});
		}
	});
}
points();
