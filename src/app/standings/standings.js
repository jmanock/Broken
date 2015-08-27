
<<<<<<< HEAD
angular.module('fantasy')
<<<<<<< HEAD
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
<<<<<<< HEAD
	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	 $scope.data = teamUser;

<<<<<<< HEAD
	// teamUser.$loaded(function(data){
	// 	angular.forEach(data, function(s){
	// 		s.splice(0,1);
			
	// 	});
	// 	$scope.data = teamUser;
	// });
=======
	
	$scope.teams = $firebaseArray(FirebaseUrl.child('teams'));
	

	
>>>>>>> feature/addButton

// 	// Get the `LeaderBoard`
// 	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));

<<<<<<< HEAD
	// Load `LeaderBoard` and sort based on `Points`
=======
	// Get the `Leaderboard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Load `Leaderboard` and sort based on `Points`
>>>>>>> 8e0e5304716e5dcec34f291fd20d7cb762ef33ed
	players.$loaded(function(data){
		var first = [];
		angular.forEach(data, function(leader){
			first.push(leader);
			first.sort(function(a,b){
				return b.Points - a.Points;
			}); // END SORT FUNCTION
<<<<<<< HEAD
		}); // END FOR EACH FUNCTION

		// Get the `Points` from `LeaderBoard` and give them to the `teamUser`
=======

		}); // END FOR EACH FUNCTION 

		// Get the `Points` from `Leaderboard` and give them to `team'
>>>>>>> 8e0e5304716e5dcec34f291fd20d7cb762ef33ed
		angular.forEach(first, function(leaderboard){
			angular.forEach(teamUser, function(teams){
				angular.forEach(teams, function(players){
					if(players.name === leaderboard.Name){
						players.points = leaderboard.Points;
					}
				}); 
			});
		});

		var second = [];
		var count = 0;
		var third = [];
		angular.forEach(first, function(some){
			second.push(some.Points);
		});
		for(var i = 0; i<second.length; i++){
			if(second[i] === second[i-1]){
				var x = i - count;
				third.push(x);
				count++;
			}else{
				third.push(i+1);
				count = 0;
			}
		}
		var map = [];
<<<<<<< HEAD
		for(var j = 0; j<second.length && j < third.length; j++){
			map.push({
				points: second[j],
				rank: third[j]
			});
		}

		for(var k = 0; k<first.length && k<map.length; k++){
			if(first[k].Points === map[k].points){
				first[k].Rank = map[k].rank;
=======
		for(var i = 0; i < second.length && i < third.length; i++){
			map.push({
				points:second[i],
				rank: third[i]
			});
		}
		for(var i = 0; i<first.length && i<map.length; i++){
			if(first[i].Points === map[i].points){
				first[i].Rank = map[i].rank;
>>>>>>> 8e0e5304716e5dcec34f291fd20d7cb762ef33ed
			}
		}
		$scope.players = first;
	}); // END LOAD FUNCTION
<<<<<<< HEAD
=======
// 	// Load `LeaderBoard` and sort based on `Points`
// 	players.$loaded(function(data){
// 		var first = [];
// 		angular.forEach(data, function(leader){
// 			first.push(leader);
// 			first.sort(function(a,b){
// 				return b.Points - a.Points;
// 			}); // END SORT FUNCTION
// 		}); // END FOR EACH FUNCTION

// 		// Get the `Points` from `LeaderBoard` and give them to the `teamUser`
// 		angular.forEach(first, function(leaderboard){
// 			angular.forEach(teamUser, function(teams){
// 				angular.forEach(teams, function(players){
// 					if(players.name === leaderboard.Name){
// 						players.points = leaderboard.Points;
// 					}
// 				});
// 			});
// 		});

// 		var second = [];
// 		var count = 0;
// 		var third = [];
// 		angular.forEach(first, function(some){
// 			second.push(some.Points);
// 		});
// 		for(var i = 0; i<second.length; i++){
// 			if(second[i] === second[i-1]){
// 				var x = i - count;
// 				third.push(x);
// 				count++;
// 			}else{
// 				third.push(i+1);
// 				count = 0;
// 			}
// 		}
// 		var map = [];
// 		for(var j = 0; j<second.length && j < third.length; j++){
// 			map.push({
// 				points: second[j],
// 				rank: third[j]
// 			});
// 		}

// 		for(var k = 0; k<first.length && k<map.length; k++){
// 			if(first[k].Points === map[k].points){
// 				first[k].Rank = map[k].rank;
// 			}
// 		}
// 		$scope.players = first;
// 	}); // END LOAD FUNCTION
>>>>>>> feature/addButton

// $scope.getTotal = function(v){
// 	var total = 0;
// 	angular.forEach(v, function(p){
// 		if(p.points === undefined){
// 			p.points = 0;
// 		}
// 		total += p.points;
// 	});
// 	return total;
// };

// $scope.somethingGood = function(s){
// // How to get the total into an array 
// 	// Then need to run the rank algorithm 
// console.log(s);	

// };

});
=======
	
	// Hides the `Players` from the `Team`
	// $scope.toggle = false;

	// Add the `points` together
	$scope.getTotal = function(v){
		var total = 0;
		angular.forEach(v, function(ps){
			if(ps.points === undefined){
				ps.points = 0;
			}
			total += ps.points;
		});
		return total;
	}
	
	// Need a new way of ordering the key and value pair to sort the totals	
});
>>>>>>> 8e0e5304716e5dcec34f291fd20d7cb762ef33ed
=======
.controller('StandingsCtrl', function(Firebase, FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
=======
>>>>>>> release/RELEASE

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
	.controller('StandingsCtrl', function($http, $scope, $q){

		var player = [];
	$http.get('app/standings/json/field.json')
	.success(function(data){
		var Players = data.Tournament.Players;
		angular.forEach(Players, function(x){

			var id = x.TournamentPlayerId;
			var parts = x.PlayerName.split(',');
	    var pName = parts[1]+ ' '+parts[0];
			player.push({
				Name:pName,
				Id:id
			});
		});
		$http.get('app/standings/json/p2.json')
		.success(function(data){
			var rounds = data.p.rnds;
			var roundOne = [];
			var roundTwo = [];
			angular.forEach(rounds, function(x){
				var roundNum = x.n;
				var holes = x.holes;
				if(roundNum === '1'){
					 roundOne.push(holes);

				}else{
					 roundTwo.push(holes);

				}
				console.log(roundOne);
			});


		});
	});

// 	var rOne = $http.get('app/profile/leaders.json');
//   var rTwo = $http.get('app/profile/r2final.json');
//
// // POINTS FUNCTION BASED ON SCORES
//
//   $q.all([rOne, rTwo]).then(function(result){
//     var tmp = [];
//     angular.forEach(result, function(response){
//       tmp.push(response.data);
//     });
//     return tmp;
//   }).then(function(tmpResult){
//     var players = [];
//     var roundOne = [];
//     var roundTwo = [];
//     angular.forEach(tmpResult, function(x){
//       var plays = x.leaderboard.players;
//       angular.forEach(plays, function(y){
//         players.push(y);
//       });
//     });
//     angular.forEach(players, function(t){
//       var firstName = t.player_bio.first_name;
//       var lastName = t.player_bio.last_name;
//       var fullName = firstName + ' ' + lastName;
//       var holes = t.holes;
//       var points = 0;
//       var round = t.current_round;
//
//       angular.forEach(holes, function(z){
//         var strokes = z.strokes;
//         var par = z.par;
//         var score = par - strokes;
//
//         if(strokes === null){
//           score = 0;
//         }else{
//           if(score === 0){
//             points = points;
//           }else if(score === 1){
//             points = points + 1;
//           }else if(score >= 2){
//             points = points + 4;
//           }else if(score === -1){
//             points = points -1;
//           }else if(score >= -2){
//             points = points -2;
//           }
//         }
//       }); // End `Holes` forEach
//       if(round === 1){
//         roundOne.push({
//           Name:fullName,
//           Points:points
//         });
//       }else{
//         roundTwo.push({
//           Name:fullName,
//           Points:points
//         });
//       }
//
//     }); // End `Players` forEach
//     var knew = [];
//     for(var i = 0; i<roundOne.length; i++){
//       for(var j = 0; j<roundTwo.length; j++){
//         if(roundOne[i].Name === roundTwo[j].Name){
//
//           knew.push({
//             Name:roundOne[i].Name,
//             RoundOnePoints:roundOne[i].Points,
//             RoundTwoPoints:roundTwo[j].Points,
//             Total:roundOne[i].Points + roundTwo[j].Points
//           });
//         }
//       }
//     }
//
//
//   }); // End `rOne, rTwo` call
}); // End controller
>>>>>>> develop
