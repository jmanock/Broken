'use strict';
var request = require('request');
var cheerio = require('cheerio');
var firebase = require('firebase');
var url  = 'https://sports.yahoo.com/golf/pga/leaderboard';
var ref = new firebase('https://toga.firebaseio.com');
var golfers = [];

function req(page,i){
  request(page, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var name = $('h1').text();
      name = name.substring(0, name.length -12);
      var eagle = $('.eagle').text();
      var birdie = $('.birdie').text();
      var bogey = $('.bogey').text();
      var double = $('dblbogey').text();
      var points = eagle.length * 3 + birdie.length * 1 + bogey.length * -1 + double.length * -2;
      var data = {
        Name: name,
        Points: points,
        Id: i
      };

      if(data.Name === 'PGA Tour' || data.Id ===0){
        delete data.Name;
        delete data.Points;
        delete data.i;
      }

      if(data.Name === ''){
        req(page,i);
      }
      golfers.push(data);
      ref.set(golfers);
      console.log(data);
    }
  });
}
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




pages();
