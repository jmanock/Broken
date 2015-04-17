'use strict';
var request = require('request');
var cheerio = require('cheerio');

// request('http://espn.go.com/golf/leaderboard', function(error, response, html){
//   if(!error && response.statusCode === 200){
//     var $ = cheerio.load(html);
//     // Gets all the players names
//     $('td.player').each(function(i, element){
//       var a = $(this);
//       //console.log(a.text() + ' ' + i);
//     });
//
//     // Adding class to make the links expanded
//   $('tr.sl').each(function(i, element){
//     var a = $(this).addClass('expanded');
//   //  console.log(i+ ' ' + a);
//   var b = $('tr.playercard').html();
//   console.log(b + i);
//   });
//
//   // Tring to get the numbers out of the scorecard
//
//   }
// });

// Yahoo golf leader board testing again
// request('https://sports.yahoo.com/golf/pga/leaderboard', function(error, response, html){
//   if(!error && response.statusCode === 200){
//     var $ = cheerio.load(html);
//     $('td.player').each(function(i, element){
//       var a = $(this).text();
//       var url = a.attr('href');
//       console.log(i + url);
//     });
//   }
// });

var request = require("request"),
	cheerio = require("cheerio"),
	url = "https://www.google.com/search?q=data+mining",

	corpus = {},
	totalResults = 0,
	resultsDownloaded = 0;

function callback () {
	resultsDownloaded++;

	if (resultsDownloaded !== totalResults) {
		return;
	}

	var words = [],prop;

	// stick all words in an array
	for (prop in corpus) {
		words.push({
			word: prop,
			count: corpus[prop]
		});
	}

	// sort array based on how often they occur
	words.sort(function (a, b) {
		return b.count - a.count;
	});

	// finally, log the first fifty most popular words
	console.log(words.slice(0, 20));
}

request(url, function (error, response, body) {
	if (error) {
		console.log(error);
		return;
	}

	// load the body of the page into Cheerio so we can traverse the DOM
	var $ = cheerio.load(body),
		links = $(".r a");

	links.each(function (i, link) {
		// get the href attribute of each link
		var url = $(link).attr("href");

		// strip out unnecessary junk
		url = url.replace("/url?q=", "").split("&")[0];

		if (url.charAt(0) === "/") {
			return;
		}

		// this link counts as a result, so increment results
		totalResults++;

		// download that page
		request(url, function (error, response, body) {
			if (error) {
				console.log( error);
				return;
			}

			// load the page into cheerio
			var $page = cheerio.load(body),
				text = $page("body").text();

			// throw away extra whitespace and non-alphanumeric characters
			text = text.replace(/\s+/g, " ")
					   .replace(/[^a-zA-Z ]/g, "")
					   .toLowerCase();

			// split on spaces for a list of all the words on that page and
			// loop through that list
			text.split(" ").forEach(function (word) {
				// we don't want to include very short or long words, as they're
				// probably bad data
				if (word.length < 5 || word.length > 25) {
					return;
				}

				if (corpus[word]) {
					// if this word is already in our "corpus", our collection
					// of terms, increase the count by one
					corpus[word]++;
				} else {
					// otherwise, say that we've found one of that word so far
					corpus[word] = 1;
				}
			});

			// and when our request is completed, call the callback to wrap up!
			callback();
		});
	});
});
