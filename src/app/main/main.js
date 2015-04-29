'use strict';
angular.module('fantasy')
.factory('FirebaseUrl', function(CONFIG){
  return new Firebase(CONFIG.Firebase.baseUrl);
})
.factory('Auth', function(FirebaseUrl, $firebaseAuth, $firebaseObject){
  var auth = $firebaseAuth(FirebaseUrl);

  function updateUser(authdUser){
    if(authdUser === null){
      return null;
    }
    var user = FirebaseUrl.child('users').child(authdUser.uid);
    user.update({
      uid: authdUser.uid,
      facebook: authdUser.facebook,
      fullName: authdUser.facebook.displayName,
      avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
    });
    user = $firebaseObject(FirebaseUrl.child('users').child(authdUser.uid));

    return user;
  }
  return{
    onAuth: function(cb){
      auth.$onAuth(function(data){
        cb(updateUser(data));
      });
    },
    login: function(){
      return auth.$authWithOAuthPopup('facebook');
    },
    logout: function(){
      auth.$unauth();
    }
  };

})
.controller('MainCtrl', function(Auth){
  var self = this;
  this.login = Auth.login;
  this.logout = Auth.logout;
  Auth.onAuth(function(user){
    self.user = user;
  });


});