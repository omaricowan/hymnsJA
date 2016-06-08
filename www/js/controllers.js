angular.module('starter.controllers', [])

.controller('SongsCtrl', function ($scope,Favs, Songs, $ionicFilterBar) {

    $scope.songs = Songs.all();
     Favs.load();
    //

    var filterBarInstance;

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.songs
            , update: function (filteredItems, filterText) {
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

    $scope.addFavSong = function (song) {
        //saves fav flg and retrieves updates song list from db
        Songs.addFavSong(song);
            Favs.reload();
    }
    
      $scope.removeFavSong = function (song) {
        //removes fav flg and retrieves updates song list from db
        Songs.removeFavSong(song);
            Favs.reload();
    }

})

.controller('SongDetailCtrl', function ($scope, $stateParams, Songs) {
    $scope.song = Songs.get($stateParams.songId);
})

.controller('FavSongDetailCtrl', function ($scope, $stateParams, Songs) {
    $scope.songFav = Songs.get($stateParams.songId);
})

.controller('CategCtrl', function ($scope, Tags) {
    $scope.tags = Tags.all();


})

.controller('CategDetailCtrl', function ($scope, $stateParams, Tags) {
    $scope.tag = Tags.get($stateParams.tagId);
})


.controller('FavSongCtrl', function ($scope, Favs, Songs) {
     $scope.$on('$ionicView.beforeEnter', function () {  
      
        var favId = 1;
        var favsongsList = Favs.get(favId).song_list;       
        var favsongs = [];
         console.log("fav song flag" +favsongsList);
        for (var i = 0; i < favsongsList.length; i++) {
            favsongs.push(
                Songs.get(favsongsList[i])
            );
            console.log("fav song flag" +Songs.get(favsongsList[i]).fav_flg);
        }

        $scope.favsongs = favsongs;
    });
    
       
})

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});