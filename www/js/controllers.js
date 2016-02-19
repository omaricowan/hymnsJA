angular.module('starter.controllers', [])

.controller('SongsCtrl', function($scope,Songs,$ionicFilterBar) {

		$scope.songs = Songs.all();	
    
    //
    
    var filterBarInstance;
        
    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.songs,
        update: function (filteredItems, filterText) {
          $scope.songs = filteredItems;
             console.log(filteredItems);
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

    $scope.refreshItems = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };
    //

})

.controller('SongDetailCtrl', function($scope, $stateParams, Songs) {
  $scope.song = Songs.get($stateParams.songId);
})

.controller('ChatsCtrl', function($scope, Chats) {
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
