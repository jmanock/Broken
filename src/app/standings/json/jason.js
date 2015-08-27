'use strict';

var fs = require('fs');
var request = require('request');
var Firebase = require('Firebase');

var ref = new Firebase('https://reditclone.firebaseio.com/leaderboard');
var TourneyPlayers = fs.readFileSync('field.json');
var CoursePar = fs.readFileSync('course.json');
var Players = JSON.parse(TourneyPlayers);
var Par = JSON.parse(CoursePar);

var url = 'http://www.pgatour.com/data/r/033/2015/scorecards';



function start(){
  var Field = [];
  var Player = Players.Tournament.Players;
  Player.forEach(function(i){
    var id = i.TournamentPlayerId;
    var parts = i.PlayerName.split(', ');
    var pName = parts[1]+' '+parts[0];
    var links = url+'/'+id+'.json';
    request(links, function(error, response, header){
      if(!error && response.statusCode === 200){
        var data = JSON.parse(header);
        var rounds = data.p.rnds;
        rounds.forEach(function(x){
          console.log(x);
        });
      }
    });
  });
}
start();
