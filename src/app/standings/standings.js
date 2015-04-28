'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseArray, $scope){
var self = this;

	// Get the `Team`
	this.teams = $firebaseArray(FirebaseUrl.child('teamUser'));

	// Get the `Leaderboard`
	this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

	// Hides the `Players` from the `Team`
	$scope.toggle = false;

})
.filter('sumOfValue', function(){
	return function(data, key){
		if(typeof(data) === 'undefinded' && typeof(key) === 'undefined'){
			return 0;
		} else{
			var sum = 0;
			for(var i = 0; i < data.length; i++){
				sum = sum + data[i][key];
			}
			return sum;
		}
	}
})