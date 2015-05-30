'use strict';

angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
	
	// Get the `Teams`
	var team = $firebaseArray(FirebaseUrl.child('teams'));
	$scope.teams = team;
	
	// Get the `LeaderBoard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));
	$scope.players = players;
});