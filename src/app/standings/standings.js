'use strict';

angular.module('fantasy')
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
