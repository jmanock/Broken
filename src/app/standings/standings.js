'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Team`
	var something = $firebaseObject(FirebaseUrl.child('teamUser'));
	something.$loaded().then(function(){
		angular.forEach(something, function(key, vale){
			angular.forEach(key, function(play){
				console.log(play.name);
			})
		})
	})
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
