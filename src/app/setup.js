'use strict';
var request = require('request');
var cheerio = require('cheerio');

//var firebase = require('firebase');
var url  = 'https://sports.yahoo.com/golf/pga/leaderboard';
// var ref = new firebase('https://toga.firebaseio.com');

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
      // if(data.Id === 0){
      //   delete data.Name;
      //   delete data.Points;
      //   delete data.Id;
      // }

      // if(data.Name === 'PGA Tour'){
      //   delete data.Name;
      //   delete data.Points;
      //   delete data.i;
      // }

      // if(data.Name === ' '){
      //   //pagesLeft.push(data.Id);
      //   //req(page,i);
      //   console.log('page not loaded!!!');
      // }
      //golfers.push(data);
      //ref.set(golfers);
      console.log(i + ' winner!' );

    }else{
      console.log(i + ' not a fucking winner!');
      req(page, i);
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

        // request(page, function(error, response, body){
        //   if(!error && response.statusCode === 200){
        //     console.log('winner! ' + i);
        //   }else{
        //     console.log('nooooo ' + i + error);
        //     request(page, function(error, response, body){
        //       if(!error && response.statusCode === 200){
        //         console.log('winner a 2nd go around! ' + i);
        //       }else{
        //         console.log('something is still going wrong ' + i + error);
        //       }
        //     });
        //   }
        // });
      });


    }
  });
}




pages();
