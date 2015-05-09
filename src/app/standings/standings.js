'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){

	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Run a function to match the `teamUser` players to `leaderboard` players
	$scope.getTeams = function(){
		$scope.teams = [];
		angular.forEach(teamUser, function(key){
			angular.forEach(key, function(play){
				angular.forEach($scope.players, function(leader){
					if(play.name === leader.Name){
						$scope.teams.push(leader);
					}
				});
			});
		});
	};
	
	// Hides the `Players` from the `Team`
	$scope.toggle = false;


	// Add `Points` together 
	$scope.getTotal = function(){
		var total = 0;
		for (var i = 0; i < $scope.ass.length; i++){
			var something = $scope.ass[i];
			total += something.points;
		}
		return total;
	};
});
