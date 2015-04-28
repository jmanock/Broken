'use strict';
var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('Firebase');
var ref = new Firebase('https://fireseedangular.firebaseio.com');
var url = ('https://sports.yahoo.com/golf/pga/leaderboard');
var golfers = [];

request(url, function(error, response, body){
	if(!error && response.statusCode === 200){
		var $ = cheerio.load(body);
		$('.player > a').each(function(){
			var name = $(this).text();
			console.log(name);

			var data = {
				name: name
			};

			golfers.push(data);
			var players = golfers.slice(1);
			ref.set(players);
		});
	}
});