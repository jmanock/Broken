'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $scope, $firebaseObject, $firebaseArray){
// Teams to update with own team name
  var self = this;
  var something = FirebaseUrl + 'teamUser';
  this.players = $firebaseObject(FirebaseUrl.child('teamUser'));
  console.log(something);

});
