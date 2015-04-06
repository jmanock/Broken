'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $scope, $firebaseArray){
// Teams to update with own team name
  FirebaseUrl.on('value', function(snapshot){
    console.log(snapshot.val().teamUser[0]);
  });

});
