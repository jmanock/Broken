'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){
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
	var obj = $firebaseObject(FirebaseUrl.child('teamUser'));
	obj.$loaded().then(function(){
		angular.forEach(obj, function(value, key){
			console.log(key, value);
		});
	});
	$scope.data = obj;
	obj.$bindTo($scope, 'data');


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
