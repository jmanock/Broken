'use strict';

angular.module('fantasy')
.controller('StandingsCtrl', function(Firebase, FirebaseUrl, $firebaseArray, $firebaseObject, $scope){
	
	// Get the `Teams`
	$scope.teams = $firebaseObject(FirebaseUrl.child('teams'));
	
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

		var map = [];
		for(var j = 0; j<second.length && j < ranking.length; j++){
			map.push({
				points: second[j],
				rank: ranking[j]
			});
		}

		for(var r = 0; r<map.length && r<first.length; r++){
			if(first[r].Points === map[r].points){
				first[r].Rank = map[r].rank;
			}
		}
		angular.forEach(first, function(leaders){
			 angular.forEach($scope.teams, function(team,val){
			 	angular.forEach(team, function(teamPlayers){
			 	if(teamPlayers.player === leaders.Name){
			 		teamPlayers.points = leaders.Points;
			 		teamPlayers.user = val;
				}
			 	});
			 });
		});

		return first;

	}); // End loaded
	
	
	$scope.players = first;
	
	$scope.total = function(v,k){
		var total = 0;
		
		angular.forEach(v, function(x){
			total += x.points;

		});		 
		//$scope.sas(total);
		return total;
			// if(!isNaN(total)){
			// 	tot.push({
			// 		name:k,
			// 		points: total
			// 	})
			// 	$scope.sas(tot);
			// }
			//console.log(tot);
		
		
	};
	$scope.sas = function(so,k){
		console.log(so,k);
	}

}) // End controller
.filter('somethingGood', function(){
	return function(input){
		var out = [];
		angular.forEach(input, function(x){
			out.push(x);
			out.sort(function(a,b){
				return b.points - a.points;
			});
		});
		
		return out;
	};
})
.filter('total', function(){
	return function(some){
		var out = [];
		angular.forEach(some, function(k,v){
			angular.forEach(k,function(plays){
				out.push({
					player:plays,
					user:v
				});
				console.log(out);
			})
			

		});
		return out;
	}
});

