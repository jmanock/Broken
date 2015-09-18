'use strict';
var fs = require('fs');
// var Firebase = require('Firebase');
// var ref = new Firebase('https://reditclone.firebaseio.com/testLeaderboard');

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
    var text = [];
    text.push({
      Name:Name,
      Rounds:RoundsPlayed,
      Points:Points
    });
    var seen = {};
    text = text.filter(function(entry){
      var previous;
      if(seen.hasOwnProperty(entry.Name)){
        previous = seen[entry.Name];
        previous = text.push(entry.Points);
        return false;
      }
      if(!Array.isArray(entry.Points)){
        entry.Points = [entry.Points];
      }
      seen[entry.Name] = entry;
      return true;
    });
console.log(JSON.stringify(text,null,2),'pre');
  }

});

// var data = [    {
//         label: "Book1",
//         data: "US edition"
//     },    {
//         label: "Book1",
//         data: "UK edition"
//     },    {
//         label: "Book2",
//         data: "CAN edition"
//     }];
// var seen = {};
// data = data.filter(function(entry) {
//     var previous;
//     // Have we seen this label before?
//     if (seen.hasOwnProperty(entry.label)) {
//         // Yes, grab it and add this data to it
//         previous = seen[entry.label];
//         previous.data.push(entry.data);
//         // Don't keep this entry, we've merged it into the previous one
//         return false;
//     }
//     // entry.data probably isn't an array; make it one for consistency
//     if (!Array.isArray(entry.data)) {
//         entry.data = [entry.data];
//     }
//
//     // Remember that we've seen it
//     seen[entry.label] = entry;
//
//     // Keep this one, we'll merge any others that match into it
//     return true;
// });
//
