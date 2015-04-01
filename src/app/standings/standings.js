'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $scope, $firebaseUrl, $stateParams){
  function($firebaseObject){
    $scope.profile = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams).child('team'));
    $scope.profile.$loaded().then(function(){
      console.log($scope.profile.name);
    });
  }
});
