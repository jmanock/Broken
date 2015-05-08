'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Team`
	$scope.teams = $firebaseObject(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

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
