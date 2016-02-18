angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	
	    //Load database
   // window.plugins.sqlDB.copy("sing", 1, copysuccess,copyerror); 
 /*      db = $cordovaSQLite.openDB("sing.db");
   // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, 'SELECT year FROM songlist;')
        .then(
            function(result) {                
                 alert("ran");
                if (result.rows.length > 0) {
                     alert("got result");
                    //$scope.song = result.rows.item(0).message;               
                   // $scope.statusMessage = "Message loaded successful, cheers!";
                }
            },
            function(error) {
                  alert("no result");
                 console.log("Error Code = "+JSON.stringify(error));
               $scope.tasks = [
                    { title: 'Collect coins' },
                    { title: 'Eat mushrooms' },
                    { title: 'Get high enough to grab the flag' },
                    { title: 'Find the Princess' }
                  ];                
            }
        ); */
	
	
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
