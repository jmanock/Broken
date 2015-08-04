'use strict';

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

	// Get the `Teams`
	$scope.teams = $firebaseArray(FirebaseUrl.child('teams'));
	var something =  new Firebase('https://fireseedangular.firebaseio.com/leaderboard/players');
	$scope.something = $firebaseArray(something);
	  // console.log($scope.something);
		$scope.something.$loaded(function(x){
			angular.forEach(x, function(z){
				var firstName = z.player_bio.first_name;
				var lastName = z.player_bio.last_name;
				console.log(firstName, lastName);
				angular.forEach(z.holes, function(y){
					// console.log(y.par, y.strokes);
					var points = y.par - y.strokes;
					var count = 0;
					if(points === 0){

					}else if(points === 1){
						count++;

					}else if(points === -1){
						count--;

					}else{
						count = count + 5;

					}

					console.log(count);
				});
				// angular.forEach(z.rounds, function(y){
				// 	console.log(y);
				// });
			});
		});



	// Get the `LeaderBoard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	var first = [];
	players.$loaded(function(ps){
		angular.forEach(ps, function(player){
			first.push(player);
			first.sort(function(a,b){
				return b.Points - a.Points;
			}); // End sort function
		});// End for each first

		var second = [];
		angular.forEach(first, function(s){
			second.push(s.Points);
		});
		var ranking = [];
		var count = 0;
		for(var i = 0; i<second.length; i++){
			if(second[i] === second[i-1]){
				var x = i - count;
				ranking.push(x);
				count++;
			}else{
				ranking.push(i+1);
				count = 0;
			}
		}

		var map = [];
		for(var j = 0; j<second.length && j < ranking.length; j++){
			map.push({
				points: second[j],
				rank: ranking[j]
			});
		}

		for(var r = 0; r<map.length && r<first.length; r++){
			if(first[r].Points === map[r].points){
				first[r].Rank = map[r].rank;
			}
		}
		angular.forEach(first, function(leaders){
			angular.forEach($scope.teams, function(x){
				angular.forEach(x, function(d){
					angular.forEach(d, function(t){
						if(t.player !== undefined){
							if(t.player === leaders.Name){
								t.points = leaders.Points;
							}
						}
					});
				});
			});
		});

		return first;

	}); // End loaded
	$scope.players = first;


	$scope.total = function(teams){
		var total = 0;

		angular.forEach(teams, function(x){
			angular.forEach(x, function(d){
				if(d.points !== undefined){
					total += d.points;
				}
			});
		});

		return total;
	};
}); // End controller
>>>>>>> develop
