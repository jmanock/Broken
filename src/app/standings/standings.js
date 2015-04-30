'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
var self = this;

	// Get the `Team`
	var something = $firebaseObject(FirebaseUrl.child('teamUser'));

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
	$scope.ass = [];
	something.$loaded().then(function(){
		console.log('loaded record:', something.$id);

		angular.forEach(something, function(value, key){
			console.log('what is this' + key);
			angular.forEach(value, function(k){
				console.log(k.name + ' ' + k.points);
				$scope.ass.push(k);
			})
		});
	});
	$scope.data = something;

});
