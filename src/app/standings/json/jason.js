'use strict';

var fs = require('fs');
var request = require('request');

var tourneyPlayers = fs.readFileSync('field.json');
var coursePar = fs.readFileSync('course.json');
var Players = JSON.parse(tourneyPlayers);
var Par = JSON.parse(coursePar);

var url = 'http://www.pgatour.com/data/r/033/2015/scorecards';

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
}
var points = function(id,rounds){
  var roundOne = [];
  var roundTwo = [];
  var roundThree = [];
  var roundFour = [];
  for(var i = 0; i<rounds.length; i++){
    var roundNum = rounds[i].n;
    var holes = rounds[i].holes;
    if(roundNum === '1'){
      roundOne.push({
        Id:id,
        Holes:holes
      });
    }else if(roundNum === '2'){
      roundTwo.push({
        Id:id,
        Holes:holes
      });
    }else if(roundNum === '3'){
      roundThree.push({
        Id:id,
        Holes:holes
      });
    }else if(roundNum === '4'){
      roundFour.push({
        Id:id,
        Holes:holes
      });
    }
  }//End for loop
};

/*
  Todo
  * Function for each round
    ~ Run Scores vs Par with each id
    ~ Store in fb
    ~ Add points
*/

var Request = function(links){
  request(links, function(error, response, header){
    if(!error && response.statusCode === 200){
        var data = JSON.parse(header);
        var id = data.p.id;
        var rounds = data.p.rnds;
        points(id, rounds);
    }
  });
};
for(var a = 0; a<Field.length; a++){
  var id = Field[a].Id;
  var links = url+'/'+id+'.json';
  Request(links);
}
