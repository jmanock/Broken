'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Team`
	//var something = $firebaseObject(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

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
	/* $scope.team = [];
var something = new Firebase('https://reditclone.firebaseio.com/userTeam');
something.orderByChild('team').on('child_added', function(snap){
	//console.log(snap.key());
	var obj = snap.val().team;
	
	angular.forEach(obj, function(some){
		$scope.team.push(some);
		
	});
});*/

// now see if I can get it to work with loaded
var something = $firebaseArray(FirebaseUrl.child('userTeam'));
$scope.teams = something;
$scope.fbName = [];
// something.$loaded(function(data){
	var knew = new Firebase('https://reditclone.firebaseio.com/userTeam')
knew.orderByChild('team').on('child_added', function(snap){
	
	var obj = snap.val().team;
	angular.forEach(obj, function(players){
		console.log(players);
	});
});

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
