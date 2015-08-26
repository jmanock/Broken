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

var ParCourse = Par.courses;
var Course = [];
for(var i = 0; i<ParCourse.length; i++){
  var HolesOnCourse = ParCourse[i].holes;
  for(var j = 0; j<HolesOnCourse.length; j++){
    var HoleNumber = HolesOnCourse[j].number;
    var ParNumber = HolesOnCourse[j].parValue;
    Course.push({
      Hole:HoleNumber,
      Par:ParNumber
    });
  } // End `HolesOnCourse` for statment
} // End `ParCourse` for statment

var Rounds = [];
var Final = [];
var points = function(id, rounds){

  for(var i = 0; i<rounds.length; i++){
    var points = 0;
    var roundNum = rounds[i].n;
    var holes = rounds[i].holes;
  } // End `Rounds` For Statment
  function totalPoints(){
    for(var i =0; i<holes.length && Course.length; i++){
      var holeNum = holes[i].cNum;
      var courseNum = Course[i].Hole;
      if(holeNum === courseNum){
        var Par = Course[i].Par;
        var Score = holes[i].sc;
        var total = Par - Score;
        if(total === 0){
          points = points;
        }else if(total === 1){
          points = points + 2;
        }else if(total >= 2){
          points = points +4;
        }else if(total === -1){
          points = points -1;
        }else if(total >= -2){
          points = points -2;
        }
      } // End `If` Statment
    } // End `For` Statment
  } // End `TotalPoints` Function
  console.log(id, points);
  return totalPoints();

}; // End `Points` Function

var load = function(Links){
  request(Links, function(error, response, header){
    if(!error && response.statusCode === 200){
      var data = JSON.parse(header);
      var id = data.p.id;
      var rounds = data.p.rnds;
      points(id, rounds);
    } // End `Error` Statment
  }); // End `Request` Statment
}; // End `Load` Function

var Field = [];
var Player = Players.Tournament.Players;
for(var x = 0; x<Player.length; x++){
  var id = Player[x].TournamentPlayerId;
  var parts = Player[x].PlayerName.split(', ');
  var pName = parts[1] +' '+parts[0];
  var links = url+'/'+id+'.json';
  Field.push({
    Name:pName,
    Id:id
  });
  load(links);
} // End `Player` for statment
