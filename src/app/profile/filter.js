'use strict';
$(document).ready(function(){
  $.getJSON('app/profile/fedexStandings.json', function(x){
    console.log(x);
  });
});
