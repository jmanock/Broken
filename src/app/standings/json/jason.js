'use strict';
var fs = require('fs');
var request = require('request');

var TourneyPlayer = fs.readFileSync('field.json');
var CoursePar = fs.readFileSync('course.json');
var Players = JSON.parse(TourneyPlayer);
var Par = JSON.parse(CoursePar);

var Field = [];
var CourseStats = [];
var Player = Players.Tournament.Players;
var ParCourse = Par.courses;
Player.forEach(function(x){
  var id = x.TournamentPlayerId;
  var parts = x.PlayerName.split(', ');
  var pName = parts[1]+' '+parts[0];
  Field.push({
    Id:id,
    Name:pName
  });
});
ParCourse.forEach(function(a){
  var holeNumber = a.number;
  var holePar = a.parValue;
  CourseStats.push({
    Hole:holeNumber,
    Par:holePar
  });
});

Field.forEach(function(i){
   var team = 'players/'+i.Id+'.json';
   var something = fs.readFileSync(team);
   var somedick = JSON.parse(something);
   var names = somedick.p.id;
   if(names === i.Id){
     var rounds = somedick.p.rnds;
     var knewName = i.Name;
     console.log(knewName);
     rounds.forEach(function(z){
       var roundsPlayed = z.n;
       var roundsPlayedHoles = z.holes;
       if(roundsPlayed === '1'){
         roundsPlayedHoles.forEach(function(t){
           var playerHoleNumber = t.cNum;
           var scoreNumber = t.sc;

         });
       }
     });
   }

});
