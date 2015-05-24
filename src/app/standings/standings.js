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

		
		$scope.players = first;
	}); // END LOAD FUNCTION
	
	// Hides the `Players` from the `Team`
	// $scope.toggle = false;

	// Add the `points` together
	$scope.getTotal = function(v){
		var total = 0;
		angular.forEach(v, function(s){
			total += s.points;
		})
		return total;
	}
	
	
		
});
