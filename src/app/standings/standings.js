'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Team`
	//var something = $firebaseObject(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Hides the `Players` from the `Team`
	$scope.toggle = false;

	// This is for the `teamUser` layout
	// $scope.ass = [];
	// something.$loaded().then(function(){

	// 	angular.forEach(something, function(value){
			
	// 		angular.forEach(value, function(k){
				
	// 			$scope.ass.push(k);
	// 		});
	// 	});
	// });
	// $scope.data = something;

	// Working on a new way to do team layout and points
$scope.data = $firebaseObject(FirebaseUrl.child('userTeam'));
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
