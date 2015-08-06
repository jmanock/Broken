// 'use strict';
// angular.module('fantasy')
// .controller('SearchCtrl', function(FirebaseUrl, $scope, $firebaseArray, $firebaseObject, $stateParams, Auth){
//
// var self = this;
// // Setup `CurrentUser`
// this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
// Auth.onAuth(function(user){
//   self.user = user;
// });
//
//
// // Load `Team`
// this.currentUser.$loaded(function(){
//   self.teams = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('team'));
//   var value = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('count'));
//   value.$loaded(function(data){
//     var show = data.$value;
//     if(show === null){
//       $scope.hide = true;
//     }
//   });
// });
//
// // Load `LeaderBoard`
// this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));
//
//
// // Add the `Player` to the `Team`
// this.add = function(p){
//   $scope.hide=false;
//   this.count(p);
// };
//
// this.count = function(p){
//   // Set-up a `Counter` to limit `Players` added
//   FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
//   .transaction(function(count){
//     if(count === null){
//       count = 0;
//       $scope.hide = true;
//     }
//     if(count >= 5){
//       // Change to an alert or something
//       console.log('That is all the players you can have!');
//     }else{
//       $scope.hide = false;
//       return(count || 0)+1;
//     }
//   },function(err, committed, ss){
//     if(err){
//       console.log(err);
//     }else if(committed){
//       var id = ss.val()-1;
//       console.log(id);
//       var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(p.$id);
//
//       userTeam.update({
//         name: p.Name
//       });
//     }
//   });
// };
//
// // Remove a `Player` from `Team`
// this.removePlayer = function(id){
//   this.remove(id);
// };
//
// this.remove = function(id){
//   FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
//   .transaction(function(id){
//     return(id || 0)-1;
//   }, function(err, committed, ss){
//     if(err){
//       console.log(err);
//     }else if(committed){
//       var i = ss.val();
//       var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
//
//       userTeam.remove();
//       if(i === 0){
//         $scope.hide = true;
//       }
//     }
//   });
// };
//
// // Save the `Team` to call in the `Standings` page
// this.save = function(){
//   // need to change this var name
//   var something = FirebaseUrl.child('teams').child(self.user.fullName).child('team');
//   something.remove();
//   angular.forEach(self.teams, function(s){
//     something.push({
//       player: s.name
//     });
//   });
// };
//
// // Reset the `Team` back to Empty
// this.reset = function(){
//   var something = FirebaseUrl.child('teams').child(self.user.fullName);
//   var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid);
//   $scope.hide = true;
//   userTeam.remove();
//   something.remove();
// };
//
// });// END CONTROLLER
'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function($http, $scope){
  $http.get('app/profile/wgc.json')
  .success(function(something){
    var players = something.Tournament.Players;
     $scope.players = [];
     for(var i = 0; i<players.length; i++){
       $scope.players.push(i);
     }
    var t = [];
    angular.forEach(players, function(x){
      t.push(x.PlayerName);
      return t;
    });

var ref = new Firebase('https://fireseedangular.firebaseio.com/');

$http.get('app/profile/leader.json')
.success(function(plays){
  var p = plays.leaderboard.players;

  angular.forEach(p, function(x){
    var firstName = x.player_bio.first_name;
    var lastName = x.player_bio.last_name;
    var fullName = firstName +' '+ lastName;
    console.log(fullName);
    var holes = x.holes;
    var points = 0;
    angular.forEach(holes, function(z){
      var strokes = z.strokes;
      var par = z.par;
      var score = par - strokes;

      if(strokes !== null){
        if(score === 0){
          // console.log('par');
          points = points;
        }else if(score === 1){
          // console.log('birdie');
          points = points + 2;
        }else if(score >= 2){
          // console.log('Thats a fucking Eagle');
          points = points + 4;
        }else if(score === -1){
          // console.log('bogie');
          points = points -1;
        }else if(score <= -2 ){
          // console.log('That over a double');
          points = points -2;
        }

      }
      return points;
    });
console.log(points);
  }); // End forEach `x`


  /*
    * What do I need to put into Fb????
      ~ Names √
      ~ Points
        - Round Points
        - Total Points
    * What info do I have to get out of the json????
      ~ Hole score √
        - Math based on par vs score
      ~ Names √
      ~ Par √
  */

});
    // Shuffle the players
    function shuffle(array){
      var currentIndex = array.length, temporaryValue, randomIndex;
      while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    shuffle(t);
    $scope.random = t;


  }); // End of `Get` call

  /* ToDo Front-End

    * FireBase
      - Save to FireBase
    * Map
      - Numbers to players
  */

  /*
    * Ideas
     - How to get scores
      ~ json file??? (curl every hour?)
  */




var teamA = [];
var teamB = [];
var teamC = [];


$scope.add = function(t){
  if(t <= 26){
    if(teamA.length <= 1){
      teamA.push(t);
      this.isDisabledA = true;

    }else{
      $scope.isDisabledA = true;
      console.log('To Many A players!!!');
    }
  }else if(t <= 52){
    if(teamB.length <= 1){
      teamB.push(t);
      this.isDisabledB = true;
    }else{
      $scope.isDisabledB = true;
      console.log('To Many B players!!!');
    }
  }else{
    if(teamC < 1){
      teamC.push(t);
      this.isDisabledC = true;
    }else{
      $scope.isDisabledC = true;
      console.log('You have a C player!');
    }
  }
  $scope.teamA = teamA;
  $scope.teamB = teamB;
  $scope.teamC = teamC;

}; // End `Add` Function

$scope.remove = function(t){
  if(t <= 26){
    var index = $scope.teamA.indexOf(t);
    $scope.teamA.splice(index,1);

  }else if(t <= 52){
    var ind = $scope.teamB.indexOf(t);
    $scope.teamB.splice(ind,1);

  }else{
    var ex = $scope.teamC.indexOf(t);
    $scope.teamC.splice(ex,1);
  }

}; // End `Remove` Function


})// End controller
.filter('firstName', function(){
  return function(x){
    var parts = x.PlayerName.split(',');
    var first = parts[1]+ ' '+parts[0];
    return first;
  };

})
.filter('secondName', function(){
  return function(x){
    var parts = x.split(',');
    var second = parts[1]+ ' '+ parts[0];
    return second;
  };
});
