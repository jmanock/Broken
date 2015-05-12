'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope, $firebaseObject){

	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	$scope.data = teamUser;

	// Get the `Leaderboard`
	$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Load the `Leaderboard` and pull points that match `userTeam`
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

	// Add the `points` together
	$scope.getTotal = function(v){
		var total = 0;
		angular.forEach(v, function(s){
			total += s.points;
		})
		return total;
	}
	
	$scope.players.$loaded(function(data){
		var s = [];
		for(var i = 0; i< data.length; i++){
			var points = data[i].Points;
			var rank;
			s.push(points);	
			s.sort(function(a, b){return b-a});
			// if(s[i] === s[i-1]){
			// 	rank = i;
			// 	console.log(rank);
			// }else{
			// 	rank = i+1;
			// 	console.log(rank);
			// }
			console.log(s)
		}
		
	})
		
});
