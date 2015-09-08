'use strict';
var fs = require('fs');
var Firebase = require('Firebase');
var ref = new Firebase('https://reditclone.firebaseio.com/leaderboard');
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
  var holes = a.holes;
  holes.forEach(function(b){
    var holeNumber = b.number;
    var parNumber = b.parValue;
    CourseStats.push({
      Hole:holeNumber,
      Par:parNumber
    });
  });
});
var RoundOne = [];
var RoundTwo = [];
var RoundThree = [];
var RoundFour = [];
Field.forEach(function(i){
   var team = 'players/'+i.Id+'.json';
   var something = fs.readFileSync(team);
   var somedick = JSON.parse(something);
   var names = somedick.p.id;
   if(names === i.Id){
     var rounds = somedick.p.rnds;
     var knewName = i.Name;

     rounds.forEach(function(z){
       var roundsPlayed = z.n;
       var roundsPlayedHoles = z.holes;
       if(roundsPlayed === '1'){
         var Points = 0;
         roundsPlayedHoles.forEach(function(t){
           CourseStats.forEach(function(c){
             var csHole = c.Hole;
             var csPar = c.Par;
             var playerHoleNumber = t.cNum;
             var scoreNumber = t.sc;
             if(csHole === playerHoleNumber){
               if(scoreNumber !== ''){
                 var total = csPar - scoreNumber;
                 if(total === 0){
                   Points = Points;
                 }else if(total === -1){
                   Points = Points -1;
                 }else if(total <= -2){
                   Points = Points -2;
                 }else if(total === 1){
                   Points = Points + 2;
                 }else if(total >= 2){
                   Points = Points + 4;
                 }
               }
             }
           });
         });
         RoundOne.push({
           Name:knewName,
           Round:1,
           Points:Points
         });
       }else if(roundsPlayed === '2'){
         var Points = 0;
         roundsPlayedHoles.forEach(function(t){
           CourseStats.forEach(function(c){
             var csHole = c.Hole;
             var csPar = c.Par;
             var playerNumber = t.cNum;
             var scoreNumber = t.sc;
             if(csHole === playerNumber){
               if(scoreNumber !== ''){
                 var total = csPar - scoreNumber;
                 if(total === 0){
                   Points = Points;
                 }else if(total === -1){
                   Points = Points -1;
                 }else if(total <= -2){
                   Points = Points -2;
                 }else if(total === 1){
                   Points = Points + 2;
                 }else if(total >= 2){
                   Points = Points + 4;
                 }
               }
             }
           });
         });
         RoundTwo.push({
           Name:knewName,
           Round:2,
           Points:Points
         });
       }else if(roundsPlayed === '3'){
         var Points = 0;
         roundsPlayedHoles.forEach(function(t){
           CourseStats.forEach(function(c){
             var csHole = c.Hole;
             var csPar = c.Par;
             var playerNumber = t.cNum;
             var scoreNumber = t.sc;
             if(csHole === playerNumber){
               if(scoreNumber !== ''){
                 var total = csPar - scoreNumber;
                 if(total === 0){
                   Points = Points;
                 }else if(total === -1){
                   Points = Points -1;
                 }else if(total <= -2){
                   Points = Points -2;
                 }else if(total === 1){
                   Points = Points + 2;
                 }else if(total >= 2){
                   Points = Points + 4;
                 }
               }
             }
           });
         });
         RoundThree.push({
           Name:knewName,
           Round:3,
           Points:Points
         });

       }else if(roundsPlayed === '4'){
         var Points = 0;
         roundsPlayedHoles.forEach(function(t){
           CourseStats.forEach(function(c){
            var csHole = c.Hole;
            var csPar = c.Par;
            var playerNumber = t.cNum;
            var scoreNumber = t.sc;
            if(csHole === playerNumber){
              if(scoreNumber !== ''){
                var total = csPar - scoreNumber;
                if(total === 0){
                  Points = Points;
                }else if(total === -1){
                  Points = Points -1;
                }else if(total <= -2){
                  Points = Points -2;
                }else if(total === 1){
                  Points = Points + 2;
                }else if(total >= 2){
                  Points = Points + 4;
                }
              }
            }
           });
         });
         RoundFour.push({
           Name:knewName,
           Round:4,
           Points:Points
         });
       }
     });
   }
});

// Have to Push Round One to Final first to get it on fb
var Final = [];
RoundOne.forEach(function(z){
  var rOneName = z.Name;
  var rOnePoints = z.Points;
  RoundTwo.forEach(function(y){
    var rTwoName = y.Name;
    var rTwoPoints = y.Points;
    if(rOneName === rTwoName){
      Final.push({
        Name:rOneName,
        RoundOne:rOnePoints,
        RoundTwo:rTwoPoints,
        Total:rOnePoints + rTwoPoints
      });
    }
  });
});

RoundThree.forEach(function(q){
  var rThreeName = q.Name;
  var rThreePoints = q.Points;
  Final.forEach(function(w){
    var finalTotal = w.Total;
    var finalName = w.Name;
    if(rThreeName === finalName){
      w.RoundThree = rThreePoints;
      w.Total = finalTotal + w.RoundThree;
      Final.join(w.RondThree);
      Final.join(w.Total);
    }
  });
});
RoundFour.forEach(function(e){
  var rFourName = e.Name;
  var rFourPoints = e.Points;
  Final.forEach(function(r){
    var fTotal = r.Total;
    var fName = r.Name;
    if(rFourName === fName){
      r.RoundFour = rFourPoints;
      r.Total = fTotal + r.RoundFour;
      Final.join(r.RoundFour);
      Final.join(r.Total);
    }
  });
});
Final.sort(function(a,b){
  return b.Total -a.Total;
});
console.log(Final);
ref.set(Final);
