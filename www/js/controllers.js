angular.module('starter.controllers', [])

.controller('SongsCtrl', function($scope,Songs,$ionicFilterBar) {
		 var filterBarInstance;
	
		$scope.songs = Songs.all();	
		
		$scope.showFilterBar = function () {
			  filterBarInstance = $ionicFilterBar.show({
				Songs: $scope.songs,
				update: function (filteredItems, filterText) {
				  $scope.songs = filteredItems;
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
			$scope.songs = Songs.all();	
			$scope.$broadcast('scroll.refreshComplete');
		  }, 100);
		};
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
