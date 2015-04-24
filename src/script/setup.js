'use strict';
var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('Firebase');
var ref = new Firebase('https://toga.firebaseio.com');
var url = ('https://sports.yahoo.com/golf/pga/leaderboard');
var golfers = [];

var firstCall = function(){
	request(url, function(error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			var links = $('.player > a');

			links.each(function(i, link){
				var urls = $(link).attr('href');
				var page = ('https://sports.yahoo.com' + urls);

				return secondCall(page, i);
			});
		}
	});
}

var secondCall = function(page, i){
	request(page, function(error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			var name = $('h1').text();
			name = name.substring(0, name.length -12);
			var eagle = $('.eagle').text();
			var birdie = $('.birdie').text();
			var bogey = $('.bogey').text();
			var dub = $('.dblbogey').text();
			var points = eagle.length * 3 + birdie.length * 1 + bogey.length * -1 + dub.length * -2;
			var data = {
				Name: name,
				Points: points,
				Id: i
			}
			if(data.Name === 'PGA Tour' || data.Id === 0){
				delete data.Name;
				delete data.Points;
				delete data.Id;
			}
			console.log(i +' this worked!! ' + data.Points);
			golfers.push(data);
			ref.set(golfers);
		}else{
			console.log(i + ' this one did NOT FUCKING WORK!!');
			secondCall(page, i);
		}
	});
}
firstCall();