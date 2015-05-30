'use strict';

angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
	
	// Get the `Teams`
	var team = $firebaseArray(FirebaseUrl.child('teams'));
	$scope.teams = team;
	
	// Get the `LeaderBoard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));
	
	var first = [];
	players.$loaded(function(ps){
		angular.forEach(ps, function(player){
			first.push(player);
			first.sort(function(a,b){
				return b.Points - a.Points;
			}); // End sort function
		});// End for each first

		var second = [];
		angular.forEach(first, function(s){
			second.push(s.Points);
		});
		var ranking = [];
		var count = 0;
		for(var i = 0; i<second.length; i++){
			if(second[i] === second[i-1]){
				var x = i - count;
				ranking.push(x);
				count++;
			}else{
				ranking.push(i+1);
				count = 0;
			}
		}
		
		return first;

	}); // End loaded
	
	
	$scope.players = first;

}); // End controller
