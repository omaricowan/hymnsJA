angular.module('starter.controllers', [])

.controller('SongsCtrl', function ($scope, Songs, $ionicFilterBar) {

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

        $scope.songs = Songs.all();
        $scope.$broadcast('scroll.refreshComplete');
      
    };
    //
    
    $scope.addFavSong = function (song){
        //saves fav flg and retrieves updates song list from db
        var newlist = Songs.addFavSong(song); 
        $scope.songs = newlist;
    }

})

.controller('SongDetailCtrl', function($scope, $stateParams, Songs) {
  $scope.song = Songs.get($stateParams.songId);
})

.controller('CategCtrl', function($scope, Tags) {
  $scope.tags = Tags.all();
    
 
})

.controller('CategDetailCtrl', function($scope, $stateParams, Tags) {
  $scope.tag = Tags.get($stateParams.tagId);
})

.controller('AccountCtrl', function($scope,Favs) {	
	$scope.favs = Favs.all();	

});
