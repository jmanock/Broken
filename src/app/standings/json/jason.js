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

var Field = [];
var Player = Players.Tournament.Players;
for(var x = 0; x<Player.length; x++){
  var id = Player[x].TournamentPlayerId;
  var parts = Player[x].PlayerName.split(', ');
  var pName = parts[1] +' '+parts[0];
  Field.push({
    Name:pName,
    Id:id
  });
  console.log(Field.Id);
} // End `Player` for statment

for(var z = 0; z<Field.length; z++){
  var id = Field[z].Id;
  var links = url+'/'+id+'.json';

}
