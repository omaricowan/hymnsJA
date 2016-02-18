angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite) {
	$scope.songs = [];
	    //Load database 		
		var query = "SELECT * FROM SongList";		 
		$cordovaSQLite.execute(db, query, []).then(function(res) {
        if(res.rows.length > 0) {
             console.log("SELECTED -> " + res.rows.item(0).ID + " " + res.rows.item(0).SongTitle);
             for (var i=0; i<res.rows.length; i++) {

                $scope.songs.push({                 
                    song_name: res.rows.item(i).SongTitle,
                    year: res.rows.item(i).Year
                    });

             }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>"+err);
    });
	
	
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
