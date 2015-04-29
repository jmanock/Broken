'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){
var self = this;

	// Get the `Team`
	this.teams = $firebaseObject(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Hides the `Players` from the `Team`
	$scope.toggle = false;

	// Get the `Total` of `Points` from `Team`
	$scope.getTotal = function(){
		var total = 0;
		for (var i = 0; i < $scope.standings.teams.length; i++){
			var something = $scope.standings.teams[i];
			total += something.points;
		}
		return total;
	};
	getTeamName(FirebaseUrl.child('teamUser'), function(userId, data){
		console.log(userId, data);
	});

	function getTeamName(callback){
		FirebaseUrl.child('teamUser').on('child_added', function(snap){
			var userId = snap.key();
			var userData = snap.val();
			console.log(userId)
		})
	}
});
