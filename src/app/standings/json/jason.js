'use strict';
// Helpers
var fs = require('fs');
var request = require('request');

// Content
var tourneyPlayers = fs.readFileSync('field.json');
var coursePar = fs.readFileSync('course.json');
var Players = JSON.parse(tourneyPlayers);
var Par = JSON.parse(coursePar);

// Urls
var url = 'http://www.pgatour.com/data/r/033/2015/scorecards';

// Gets all the scores runs them against par
var points = function(id, rounds){
  console.log(id,rounds);
};

// Calls all the files
var req = function(links){
  request(links, function(error, response, header){
    if(!error && response.statusCode === 200){
      var data = JSON.parse(header);
      var id = data.p.id;
      var rounds = data.p.rnds;
      points(id,rounds);
    }
  });
};

// Makes the links url with the id
var urls = function(Field){
  for(var i = 0; i<Field.length; i++){
    var id = Field[i].Id;
    var links = url+'/'+id+'.json';
    req(links);
  }
};
// Change these to functions
// Getting players out of the field
var Field = [];
var player = Players.Tournament.Players;
for(var i = 0; i<player.length; i++){
  var id = player[i].TournamentPlayerId;
  var parts = player[i].PlayerName.split(', ');
  var pName = parts[1]+' '+parts[0];
  Field.push({
    Name:pName,
    Id:id
  });
  urls(Field);
}
