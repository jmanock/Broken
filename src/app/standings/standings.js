'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject, $stateParams){
//var self = this;

	// Get the `Players` from the `teamUser`
	// $scope.teams = [];
	 var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	// teamUser.$loaded().then(function(){
	// 	angular.forEach(teamUser, function(key){
	// 		angular.forEach(key, function(play){
	// 			 return $scope.teams.push(play);
	// 		});
	// 	});
	// });
	//$scope.data = teamUser;

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Figure out how to match the leaderboard names to team names
	$scope.test = function(){
		$scope.teams = [];
		
		
		angular.forEach(teamUser, function(key, value){
			//console.log(key, value);
			angular.forEach(key, function(play){
				
				angular.forEach($scope.players, function(leader){
					if(play.name === leader.Name){
						$scope.teams.push(leader);
						console.log('winner winner chicken dinner');
					}
				});
			});
		});
	};
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
