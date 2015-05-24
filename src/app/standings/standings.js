'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){

	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	 $scope.data = teamUser;

	// Get the `Leaderboard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Load `Leaderboard` and sort based on `Points`
	players.$loaded(function(data){
		var first = [];
		angular.forEach(data, function(leader){
			first.push(leader);
			first.sort(function(a,b){
				return b.Points - a.Points;
			}); // END SORT FUNCTION

		}); // END FOR EACH FUNCTION 

		// Get the `Points` from `Leaderboard` and give them to `team'
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
		for(var i = 0; i < second.length && i < third.length; i++){
			map.push({
				points:second[i],
				rank: third[i]
			});
		}
		for(var i = 0; i<first.length && i<map.length; i++){
			if(first[i].Points === map[i].points){
				first[i].Rank = map[i].rank;
			}
		}
		$scope.players = first;
	}); // END LOAD FUNCTION
	
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

	
	
		
});
