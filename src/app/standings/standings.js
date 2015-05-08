'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Players` from the `teamUser`
	$scope.teams = [];
	var something = $firebaseObject(FirebaseUrl.child('teamUser'));
	something.$loaded().then(function(){
		angular.forEach(something, function(key, vale){
			angular.forEach(key, function(play){
				 return $scope.teams.push(play);
			});
		});
	});
	$scope.data = something;


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
