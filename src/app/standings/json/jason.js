'use strict';
var fs = require('fs');
var Firebase = require('firebase');
var ref = new Firebase('https://reditclone.firebaseio.com/testLeaderboard');

var TourneyPlayer = fs.readFileSync('field.json');
var CoursePar = fs.readFileSync('course.json');
var Players = JSON.parse(TourneyPlayer);
var Par = JSON.parse(CoursePar);

var Field = [];
var CourseStats = [];
var Player = Players.Tournament.Players;
var ParCourse = Par.courses;
Player.forEach(function(a){
  var id = a.TournamentPlayerId;
  var parts = a.PlayerName.split(', ');
  var pName = parts[1] + ' '+parts[0];
  Field.push({
    Id:id,
    Name:pName
  });
});

ParCourse.forEach(function(b){
  var holes = b.holes;
  holes.forEach(function(c){
    var holeNumber = c.number;
    var parNumber = c.parValue;
    CourseStats.push({
      Hole:holeNumber,
      Par:parNumber
    });
  });
});

var final = [];
// var RoundOne = [];
// var RoundTwo = [];
// var RoundThree = [];
// var RoundFour = [];
Field.forEach(function(d){
  var team = 'players/'+d.Id+'.json';
  var something = fs.readFileSync(team);
  var somedick = JSON.parse(something);
  var names = somedick.p.id;
  if(names === d.Id){
    var rounds = somedick.p.rnds;
    var knewName = d.Name;

    rounds.forEach(function(e){

      var roundsPlayed = e.n;
      var roundsPlayedHoles = e.holes;
      var Points = 0;
      pPoints(roundsPlayedHoles, Points, roundsPlayed);
      // if(roundsPlayed === '1'){
      //   var Points = 0;
      //
      //   pPoints(roundsPlayedHoles, Points, roundsPlayed);
      // }else if(roundsPlayed === '2'){
      //   var Points = 0;
      //   pPoints(roundsPlayedHoles, Points, roundsPlayed);
      // }

    });
  }
  function pPoints(HolesPlayed, Points, RoundsPlayed){
      HolesPlayed.forEach(function(f){
        var PlayerHoleNumber = f.cNum;
        var scoreNumber = f.sc;
        CourseStats.forEach(function(g){
          var csHole = g.Hole;
          var csPar = g.Par;
          if(csHole === PlayerHoleNumber){
            var total = csPar - scoreNumber;
            if(total === 0){
              Points = Points;
            }else if(total === 1){
              Points = Points + 2;
            }else if(total >= 2){
              Points = Points + 4;
            }else if(total === -1){
              Points = Points -1;
            }else if(total <= -2){
              Points = Points -2;
            }
          }

        });

      });
      fFinal(RoundsPlayed,Points,knewName);
  }
  function fFinal(RoundsPlayed, Points, Name){

    final.push({
      Name:Name,
      Rounds:RoundsPlayed,
      Points:Points
    });

  }

});

var newArr = [];
var types = {};
var i = 0;
var j;
var cur;
for(j = final.length; i<j; i++){
  cur = final[i];
  if(!(cur.Name in types)){
    types[cur.Name] ={Name: cur.Name, Points:[]};
    newArr.push(types[cur.Name]);
  }
  types[cur.Name].Points.push(cur.Points);
}
ref.set(final);
