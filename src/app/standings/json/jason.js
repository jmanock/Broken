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
var points = function(id, rounds){
  var totalPoints = function(Holes, Points,x){
    console.log(Points,x);
    // Take apart holes
    // add Points
    // store id, points, round num
  }; // End `TotalPoints` Function
  for(var i = 0; i<rounds.length; i++){
    var points = 0;
    var roundNum = rounds[i].n;
    var holes = rounds[i].holes;

    if(roundNum === '1'){
       totalPoints(holes,points,1);
    }else if(roundNum === '2'){
       totalPoints(holes,points,2);
    }else if(roundNum === '3'){
       totalPoints(holes,points,3);
    }else if(roundNum === '4'){
       totalPoints(holes,points,4);
    }

  } // End `Rounds` For Statment

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
