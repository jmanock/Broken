'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){

	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	$scope.data = teamUser;
	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Run a function to match the `teamUser` players to `leaderboard` players
	$scope.getPoints = function(){
		
		
	};
	
	$scope.players.$loaded(function(data){
		angular.forEach(data, function(leader){
			angular.forEach(teamUser, function(data){
				angular.forEach(data, function(player){
					if(player.name === leader.Name){
						player.points = leader.Points;
					}
				});
			});
		});
	});
	// Hides the `Players` from the `Team`
	$scope.toggle = false;


	// Add `Points` together 
	$scope.getTotal = function(){
		 var total = 0;
		// for (var i = 0; i < $scope.data.length; i++){
		// 	var totalPoints = $scope.data[i];
		// 	total += totalPoints.points;
		// }
		// return total;

	};
});
