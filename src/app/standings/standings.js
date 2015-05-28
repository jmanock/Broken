'use strict';

angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
	// Set the `teamUser`
	var teamUser = $firebaseObject(FirebaseUrl.child('teamUser'));
	$scope.data = teamUser;

	// teamUser.$loaded(function(data){
	// 	angular.forEach(data, function(s){
	// 		s.splice(0,1);
			
	// 	});
	// 	$scope.data = teamUser;
	// });

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

		// Get the `Points` from `LeaderBoard` and give them to the `teamUser`
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
		var map = [];
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

$scope.getTotal = function(v){
	var total = 0;
	angular.forEach(v, function(p){
		if(p.points === undefined){
			p.points = 0;
		}
		total += p.points;
	});
	return total;
};

$scope.somethingGood = function(s){
// How to get the total into an array 
	// Then need to run the rank algorithm 
console.log(s);	

};

});