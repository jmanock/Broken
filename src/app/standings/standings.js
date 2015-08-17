

	// // // Get the `Teams`
	// // $scope.teams = $firebaseArray(FirebaseUrl.child('teams'));
	// // var something =  new Firebase('https://fireseedangular.firebaseio.com/leaderboard/players');
	// // $scope.something = $firebaseArray(something);
	// //   // console.log($scope.something);
	// // 	$scope.something.$loaded(function(x){
	// // 		angular.forEach(x, function(z){
	// // 			var firstName = z.player_bio.first_name;
	// // 			var lastName = z.player_bio.last_name;
	// // 			console.log(firstName, lastName);
	// // 			angular.forEach(z.holes, function(y){
	// // 				// console.log(y.par, y.strokes);
	// // 				var points = y.par - y.strokes;
	// // 				var count = 0;
	// // 				if(points === 0){
	// //
	// // 				}else if(points === 1){
	// // 					count++;
	// //
	// // 				}else if(points === -1){
	// // 					count--;
	// //
	// // 				}else{
	// // 					count = count + 5;
	// //
	// // 				}
	// //
	// // 				console.log(count);
	// // 			});
	// // 			// angular.forEach(z.rounds, function(y){
	// // 			// 	console.log(y);
	// // 			// });
	// // 		});
	// // 	});
	// //
	// //
	// //
	// // // Get the `LeaderBoard`
	// // var players = $firebaseArray(FirebaseUrl.child('leaderboard'));
	// //
	// // var first = [];
	// // players.$loaded(function(ps){
	// // 	angular.forEach(ps, function(player){
	// // 		first.push(player);
	// // 		first.sort(function(a,b){
	// // 			return b.Points - a.Points;
	// // 		}); // End sort function
	// // 	});// End for each first
	// //
	// // 	var second = [];
	// // 	angular.forEach(first, function(s){
	// // 		second.push(s.Points);
	// // 	});
	// // 	var ranking = [];
	// // 	var count = 0;
	// // 	for(var i = 0; i<second.length; i++){
	// // 		if(second[i] === second[i-1]){
	// // 			var x = i - count;
	// // 			ranking.push(x);
	// // 			count++;
	// // 		}else{
	// // 			ranking.push(i+1);
	// // 			count = 0;
	// // 		}
	// // 	}
	// //
	// // 	var map = [];
	// // 	for(var j = 0; j<second.length && j < ranking.length; j++){
	// // 		map.push({
	// // 			points: second[j],
	// // 			rank: ranking[j]
	// // 		});
	// // 	}
	// //
	// // 	for(var r = 0; r<map.length && r<first.length; r++){
	// // 		if(first[r].Points === map[r].points){
	// // 			first[r].Rank = map[r].rank;
	// // 		}
	// // 	}
	// // 	angular.forEach(first, function(leaders){
	// // 		angular.forEach($scope.teams, function(x){
	// // 			angular.forEach(x, function(d){
	// // 				angular.forEach(d, function(t){
	// // 					if(t.player !== undefined){
	// // 						if(t.player === leaders.Name){
	// // 							t.points = leaders.Points;
	// // 						}
	// // 					}
	// // 				});
	// // 			});
	// // 		});
	// // 	});
	// //
	// // 	return first;
	// //
	// // }); // End loaded
	// // $scope.players = first;
	// //
	// //
	// // $scope.total = function(teams){
	// // 	var total = 0;
	// //
	// // 	angular.forEach(teams, function(x){
	// // 		angular.forEach(x, function(d){
	// // 			if(d.points !== undefined){
	// // 				total += d.points;
	// // 			}
	// // 		});
	// // 	});
	// //
	// // 	return total;
	// };
	'use strict';

	angular.module('fantasy')
	.controller('StandingsCtrl', function($http, $scope){
	$http.get('app/standings/json/leaderboard.json')
	.success(function(data){
		/*
		Trying to Find
		~ Score cards from each round of each player
			- Run points system off that
				~ What I have now wont work becasue of delays and time
				- Have to find a way to just get the round scorecards
		*/
	});
	var rOne = $http.get('app/profile/leaders.json');
  var rTwo = $http.get('app/profile/r2final.json');

// POINTS FUNCTION BASED ON SCORES

  $q.all([rOne, rTwo]).then(function(result){
    var tmp = [];
    angular.forEach(result, function(response){
      tmp.push(response.data);
    });
    return tmp;
  }).then(function(tmpResult){
    var players = [];
    var roundOne = [];
    var roundTwo = [];
    angular.forEach(tmpResult, function(x){
      var plays = x.leaderboard.players;
      angular.forEach(plays, function(y){
        players.push(y);
      });
    });
    angular.forEach(players, function(t){
      var firstName = t.player_bio.first_name;
      var lastName = t.player_bio.last_name;
      var fullName = firstName + ' ' + lastName;
      var holes = t.holes;
      var points = 0;
      var round = t.current_round;

      angular.forEach(holes, function(z){
        var strokes = z.strokes;
        var par = z.par;
        var score = par - strokes;

        if(strokes === null){
          score = 0;
        }else{
          if(score === 0){
            points = points;
          }else if(score === 1){
            points = points + 1;
          }else if(score >= 2){
            points = points + 4;
          }else if(score === -1){
            points = points -1;
          }else if(score >= -2){
            points = points -2;
          }
        }
      }); // End `Holes` forEach
      if(round === 1){
        roundOne.push({
          Name:fullName,
          Points:points
        });
      }else{
        roundTwo.push({
          Name:fullName,
          Points:points
        });
      }

    }); // End `Players` forEach
    var knew = [];
    for(var i = 0; i<roundOne.length; i++){
      for(var j = 0; j<roundTwo.length; j++){
        if(roundOne[i].Name === roundTwo[j].Name){

          knew.push({
            Name:roundOne[i].Name,
            RoundOnePoints:roundOne[i].Points,
            RoundTwoPoints:roundTwo[j].Points,
            Total:roundOne[i].Points + roundTwo[j].Points
          });
        }
      }
    }


  }); // End `rOne, rTwo` call
}); // End controller
