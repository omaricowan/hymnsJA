angular.module('starter.controllers', [])

.controller('SongsCtrl', function ($scope,Favs, Songs,Settings, $ionicActionSheet,$ionicModal,$ionicPopup, $ionicFilterBar) {

    $scope.songs = Songs.all();
    Settings.all();
     Favs.load();
    //
//-----------------------------------Search bar implementation-----------------------------------//
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
    
//-----------------------------------Search bar implementation-----------------------------------//
$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Hymns JA',
     template: 'Songs for AY / Praise and Worship'
   });
 
   alertPopup.then(function(res) {
     console.log('Thank you for advice.');
   });
 };
    
//-----------------------------------Fnt Size Modal implementation-----------------------------------//
    $scope.fontsizeVal = "12";
    $ionicModal.fromTemplateUrl('./templates/fontSize-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
      
   });
	
   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
        //saves fontSize value
      Settings.saveSettings($scope.fontsizeVal);
      Settings.all();
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
    
//-----------------------------------Setting menu implementation-----------------------------------//
     // Triggered on a button click, or some other target
    $scope.showMenu = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Change Song Font Size' },
       { text: 'About' }
     ],
     titleText: 'Settings',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
         if(index==0){
             $scope.openModal();     
         }
       
         if(index==1){
         
             $scope.showAlert();
          }
       return true;
     }
        });
    };
//-----------------------------------Search refresh implementation-----------------------------------//
    $scope.refreshItems = function () {
        if (filterBarInstance) {
            filterBarInstance();
            filterBarInstance = null;
        }

        $scope.songs = Songs.all();
        $scope.$broadcast('scroll.refreshComplete');

    };
    //
    

//-----------------------------------Song list implementation-----------------------------------//
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

.controller('SongDetailCtrl', function ($scope, $stateParams, Songs, Settings) {
    $scope.song = Songs.get($stateParams.songId);
    var settings = Settings.get();
    $scope.settings = settings; 
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