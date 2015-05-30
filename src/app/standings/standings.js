'use strict';

angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
	
	// Get the `Teams`
	var team = $firebaseArray(FirebaseUrl.child('teams'));
	$scope.teams = team;
	
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
		return first;
	}); // End loaded
	$scope.players = first;
	console.log(first);
}); // End controller
