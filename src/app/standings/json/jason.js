'use strict';

var fs = require('fs');
var request = require('request');

var tourneyPlayers = fs.readFileSync('field.json');
var coursePar = fs.readFileSync('course.json');
var Players = JSON.parse(tourneyPlayers);
var Par = JSON.parse(coursePar);

var url = 'http://www.pgatour.com/data/r/033/2015/scorecards';

var ParCourse = Par.courses;
var courseStats = [];
for(var b = 0; b<ParCourse.length; b++){
  var courseHoles = ParCourse[b].holes;
  for(var c = 0; c<courseHoles.length; c++){
    var holeNumber = courseHoles[c].number;
    var parNumber = courseHoles[c].parValue;
    courseStats.push({
      Hole:holeNumber,
      Par:parNumber
    });
  }
}

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
var PlayerStats = [];
var FinalPlayerStats = [];
var points = 0;
var firstRound = function(oneRound){
  /*
    Has to be a way where I can get the id then all the holes
  */
  for(var i = 0; i<oneRound.length; i++){
    var id = oneRound[i].Id;
    var holes = oneRound[i].Holes;
    console.log(id);
    for(var j = 0; j<holes.length && j<courseStats.length; j++){
      var holeNum = holes[j].cNum;
      var score = holes[j].sc;
      var Par = courseStats[j].Par;
      var courseNum = courseStats[j].Hole;
      var total = Par - score;
      if(courseNum === holeNum){
        if(total === 0){
          console.log('Par');
        }else if(total === 1){
          console.log('Birdie');
        }else if(total >= 2){
          console.log('Eagle or better');
        }else if(total === -1){
          console.log('Bogie');
        }else if(total >= -2){
          console.log('Double or worse');
        }
      }
    
    }

  }
  // for(var i = 0; i<oneRound.length; i++){
  //   var holes = oneRound[i].Holes;
  //   var playerId = oneRound[i].Id;
  //   for(var j = 0; j<holes.length; j++){
  //     var holeNumber = holes[j].cNum;
  //     var score = holes[j].sc;
  //     PlayerStats.push({
  //       Hole:holeNumber,
  //       Score:score,
  //       PlayerId:playerId
  //     });
  //   }
  // }
  //
  // for(var a = 0; a<PlayerStats.length; a++){
  //   var hole = PlayerStats[a].Hole;
  //   var Score = PlayerStats[a].Score;
  //   var id = PlayerStats[a].PlayerId;
  //   for(var b = 0; b<courseStats.length; b++){
  //     var cHole = courseStats[b].Hole;
  //     var cPar = courseStats[b].Par;
  //     if(hole === cHole){
  //       FinalPlayerStats.push({
  //         Id:id,
  //         Score:Score,
  //         Par:cPar
  //       });
  //
  //     }
  //   }
  // }
  // for(var c = 0; c<FinalPlayerStats.length; c++){
  //   var pScore = FinalPlayerStats[c].Score;
  //   var par = FinalPlayerStats[c].Par;
  //   var total = par - pScore;
  //   // Not going to work, I have to get the holes into there own object
  // }
}; // End function
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
   firstRound(roundOne);

};



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
