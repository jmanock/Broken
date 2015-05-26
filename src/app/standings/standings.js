'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){

	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	$scope.data = teamUser;

	// Get the `LeaderBoard`
	var players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Load `LeaderBoard` and sort based on `Points`
	players.$loaded(function(data){
		var first = [];
		angular.forEach(data, function(leader){
			first.push(leader);
			first.sort(function(a,b){
				return b.Points - a.Points;
			}); // END SORT FUNCTION
		}); // END FOR EACH FUNCTION

		// Ger the `Points` from `LeaderBoard` and something
		angular.forEach(first, function(leaderboard){
			angular.forEach(teamUser, function(teams){
				angular.forEach(teams, function(players){
					if(players.name === leaderboard.Name){
						players.points = leaderboard.Points;
					}
				});
			});
		});
		var second = [];
		var count = 0;
		var third = [];
		angular.forEach(first, function(some){
			second.push(some.Points);
		});
		for(var i = 0; i<second.length; i++){
			if(second[i] === second[i-1]){
				var x = i - count;
				third.push(x);
				count++;
			}else{
				third.push(i+1);
				count = 0;
			}
		}
		var map =[];
		for(var j = 0; j<second.length && j < third.length; j++){
			map.push({
				points: second[j],
				rank: third[j]
			});
		}

		for(var k = 0; k<first.length && k<map.length; k++){
			if(first[k].Points === map[k].points){
				first[k].Rank = map[k].rank;
			}
		}
		$scope.players = first;
	}); // END LOAD FUNCTION

// Add the `points` together
	$scope.getTotal = function(v){
		var total = 0;
		angular.forEach(v, function(ps){
			if(ps.points === undefined){
				ps.points = 0;
			}
			total += ps.points;
		});
		return total;
	};

	
}); // END CONTROLLER