'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope){
var self = this;

	// Get the `Team`
	this.teams = $firebaseArray(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Hides the `Players` from the `Team`
	$scope.toggle = false;

	
});