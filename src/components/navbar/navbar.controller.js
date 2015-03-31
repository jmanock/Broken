'use strict';

angular.module('fantasy')
.controller('NavbarCtrl', function($scope){
  $scope.format = 'M/d/yy h:mm:ss a';
})
.directive('myCurrentTime', function(dateFilter){
  return function(scope, element, attrs){
    var format;

    scope.$watch(attrs.myCurrentTime, function(value){
      format = value;
      updateTime();
    });
    function updateTime(){
      var dt = dateFilter(new Date(), format);
      element.text(dt);
    }
    function updateLater(){
      setTimeout(function(){
        updateTime();
        updateLater();
      }, 1000);
    }
    updateLater();
  };
});
