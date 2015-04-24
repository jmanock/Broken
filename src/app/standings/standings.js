'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function($scope,FirebaseUrl, $firebaseObject, $firebaseArray ){

	var self = this;
	var ref = new Firebase('https://toga.firebaseio.com/');
  this.players = $firebaseArray(ref);
  $scope.toggle = true;
	this.teams = $firebaseArray(FirebaseUrl.child('teamUser'));
});
