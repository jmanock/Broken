'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $firebaseObject, $firebaseArray ){

	var self = this;
	var ref = new Firebase('https://toga.firebaseio.com/');
  this.players = $firebaseArray(ref);
  
	this.teams = $firebaseArray(FirebaseUrl.child('teamUser'));
});
