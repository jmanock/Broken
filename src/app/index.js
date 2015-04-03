'use strict';

angular.module('fantasy', ['ui.router', 'firebase'])
.constant('CONFIG',{
  Firebase: {
    baseUrl:'https://reditclone.firebaseio.com/'
  }
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  })
  .state('profile',{
    url:'/profile/:id',
    templateUrl: 'app/profile/profile.html',
    controller: 'SearchCtrl'
  })
  .state('standings',{
    url:'/standings',
    templateUrl: 'app/standings/standings.html',
    controller: 'StandingsCtrl'
  });
  $urlRouterProvider.otherwise('/');
});
