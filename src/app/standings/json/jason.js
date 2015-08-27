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

var parCourse = Par.courses;
var Course = [];
parCourse.forEach(function(i){
  var holes = i.holes;
  holes.forEach(function(x){
    var holeNumber = x.number;
    var holePar = x.parValue;
    Course.push({
      Hole:holeNumber,
      Par:holePar
    });
  });

});

function start(){
  var Player = Players.Tournament.Players;

  Player.forEach(function(i){
    var points = 0;
    var id = i.TournamentPlayerId;
    var parts = i.PlayerName.split(', ');
    var pName = parts[1]+' '+parts[0];
    var links = url+'/'+id+'.json';
    request(links, function(error, response, header){
      if(!error && response.statusCode === 200){
        var data = JSON.parse(header);
        var rounds = data.p.rnds;
        rounds.forEach(function(x){

          var holes = x.holes;
          for(var j = 0; j<holes.length && j<Course.length; j++){
            var holeNum = holes[j].cNum;
            var courseNum = Course[j].Hole;
            if(holeNum === courseNum){
              var Par = Course[j].Par;
              var Score = holes[j].sc;
              var Total = Par - Score;

              if(Total === 0){
                points = points;
              }else if(Total === 1){
                points = points + 2;
              }else if(Total >= 2){
                points = points + 4;
              }else if(Total === -1){
                points = points -1;
              }else if(Total >= -2){
                points = points -2;
              }
            } // End `Equal` Statment
            
          } // End `For` Statment

        }); // End `Rounds` forEach
        console.log(pName, points);
      } // End `Error` if Statment
    }); // End `Request` function
  }); // End `Players` forEach
}
start();
