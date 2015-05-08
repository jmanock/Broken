'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Players` from the `teamUser`
	$scope.teams = [];
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	teamUser.$loaded().then(function(){
		angular.forEach(teamUser, function(key){
			angular.forEach(key, function(play){
				 return $scope.teams.push(play);
			});
		});
	});
	$scope.data = teamUser;

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Figure out how to match the leaderboard names to team names
	$scope.test = function(){
		angular.forEach($scope.players, function(leaders){
			angular.forEach($scope.teams, function(teams){
				if(leaders.Name === teams.name){
					teams.points = leaders.Points;
					console.log(teams.points);
				}
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
