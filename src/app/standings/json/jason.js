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
var fire = function(id,points){
  console.log(id,points);
};
var firstRound = function(oneRound){
  for(var i = 0; i<oneRound.length; i++){
    var id = oneRound[i].Id;
    var points = 0;
    var holes = oneRound[i].Holes;
    // console.log(id);
    for(var j = 0; j<holes.length && j<courseStats.length; j++){
      var courseNum = courseStats[j].Hole;
      var holeNum = holes[j].cNum;
      if(courseNum === holeNum){

        var sPar = courseStats[j].Par;
        var score = holes[j].sc;
        var total = sPar - score;

        if(total === 0){
          points = points;
        }else if(total === 1){
          points = points + 2;
        }else if(total >= 2){
          points = points + 4;
        }else if(total === -1){
          points = points -1;
        }else if(total >= -2){
          points = points -2;
        }

      } // End `Num` equals if
    } // End `For holes and coursStats`
    fire(id, points);
  } // End `oneRound` for statment

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
