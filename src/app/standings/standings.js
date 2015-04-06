'use strict';
angular.module('fantasy')
.controller('StandingsCtrl', function(FirebaseUrl, $scope, $firebaseObject){
// Teams to update with own team name
  var self = this;
  // $scope.profile = $firebaseObject(FirebaseUrl.child('teamUser').child(player.$id));
  // $scope.profile.$loaded().then(function(){
  //   console.log($scope.profile);
  //});
// this.searchItem();
//   this.searchItem = function(player){
//     self.users = $firebaseObject(FirebaseUrl.child('teamUsers').child(player.id));
//     self.users.$loaded(function(){
//       console.log(self.users);
//     });
//   };
  $scope.profile = $firebaseObject(FirebaseUrl.child('teamUser'));
  $scope.profile.$loaded(function(){

    });
    //console.log($scope.profile[1].name);
  
});
