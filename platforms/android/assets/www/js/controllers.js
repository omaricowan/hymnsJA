angular.module('starter.controllers', [])


.controller('SongsCtrl', function ($rootScope, $scope, Favs, Songs, Settings, localDatabaseService, $ionicActionSheet, $ionicModal, $ionicPopup, $ionicFilterBar, $ionicLoading, $ionicTabsDelegate) {


    $scope.showLoading = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.startup = function () {
        $scope.settings = Settings.all();
        $scope.songs = Songs.all();
        $rootScope.songs = $scope.songs;
        $rootScope.settings = $scope.settings;
        //var settings = Settings.get();



    };

    //Favs.load();



    localDatabaseService.getDatabase().then(function () {
        $scope.startup();
        console.log("start-up");
    })




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


    /////----------------------------------------------------- ***************************---------------------------------------------/////////   
    /////--------------------------------------------------------Start to be modularized--------------------------------------------/////////
    /////------------------------------------------------------ ***************************----------------------------------/////////
    ////-----------------------------------------------------******************************-------------------------------------------////////     

    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }


    /////----------------------------------------------------- ***************************---------------------------------------------/////////   
    /////--------------------------------------------------------Start to be modularized--------------------------------------------/////////
    /////------------------------------------------------------ ***************************----------------------------------/////////
    ////-----------------------------------------------------******************************-------------------------------------------////////   

    //-----------------------------------About Us-----------------------------------//
    //-----------------Create Modal---------
    $ionicModal.fromTemplateUrl('./templates/aboutUS-modal.html', {
        scope: $scope
        , animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.aboutModal = modal;
    });

    $scope.openAboutModal = function () {
        $scope.aboutModal.show();
    };

    $scope.closeAboutModal = function (fontsizeVal) {
        //saves fontSize value

        $scope.aboutModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.aboutModal.remove();
    });

    // Execute action on hide modal
    $scope.$on('aboutModal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('aboutModal.removed', function () {
        // Execute action
    });

    //-----------------------------------Fnt Size Modal implementation-----------------------------------//


    //-----------------Create Modal---------
    $ionicModal.fromTemplateUrl('./templates/fontSize-modal.html', {
        scope: $scope
        , animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.fontModal = modal;
        // ---------retrieve fontsize------ 
    });

    $scope.openModal = function () {
        $scope.fontModal.show();
    };

    $scope.closeModal = function (fontsizeVal) {
        //saves fontSize value
        Settings.saveSettings(fontsizeVal);
        Settings.all();
        $scope.fontModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.fontModal.remove();
    });

    // Execute action on hide modal
    $scope.$on('fontModal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('fontModal.removed', function () {
        // Execute action
    });

    //-----------------------------------Setting menu implementation-----------------------------------//
    // Triggered on a button click, or some other target
    $scope.showMenu = function () {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {
                    text: 'Change Song Font Size'
                }










































                
                , {
                    text: 'About'
                }
     ]
            , titleText: 'Settings'
            , cancelText: 'Cancel'
            , cancel: function () {
                // add cancel code..
            }
            , buttonClicked: function (index) {
                if (index == 0) {
                    $scope.openModal();
                }

                if (index == 1) {

                    $scope.openAboutModal();
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
    /////----------------------------------------------------- ***************************---------------------------------------------/////////   
    /////--------------------------------------------------------  End to be modularized--------------------------------------------/////////
    /////------------------------------------------------------ ***************************----------------------------------/////////
    ////-----------------------------------------------------******************************-------------------------------------------////////  

    //-----------------------------------Song list implementation-----------------------------------//
    //    $scope.addFavSong = function (song) {
    //        //saves fav flg and retrieves updates song list from db
    //        Songs.addFavSong(song);
    //        Favs.reload();
    //    }
    //
    //    $scope.removeFavSong = function (song) {
    //        //removes fav flg and retrieves updates song list from db
    //        Songs.removeFavSong(song);
    //        Favs.reload();
    //    }



})

.controller('SongDetailCtrl', function ($rootScope, $scope, $stateParams, Songs, Settings) {
    $scope.$on('$ionicView.beforeEnter', function () {

        $scope.song = Songs.get($scope.songs, $stateParams.songId);



    });

})

//.controller('FavSongDetailCtrl', function ($scope, $stateParams, Songs) {
//    $scope.songFav = Songs.get($stateParams.songId);
//})

.controller('CategCtrl', function ($scope, Tags, $ionicFilterBar, Settings, $ionicActionSheet, $ionicModal, $ionicTabsDelegate) {
    $scope.tags = Tags.all();
    Settings.all();
    //-----------------------------------Search bar implementation-----------------------------------//
    var filterBarInstance;

    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.tags
            , update: function (filteredItems, filterText) {
                $scope.tags = filteredItems;
                console.log(filteredItems);
                if (filterText) {
                    console.log(filterText);
                }
            }
        });
    };

    /////----------------------------------------------------- ***************************---------------------------------------------/////////   
    /////--------------------------------------------------------Start to be modularized--------------------------------------------/////////
    /////------------------------------------------------------ ***************************----------------------------------/////////
    ////-----------------------------------------------------******************************-------------------------------------------////////     

    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    /////----------------------------------------------------- ***************************---------------------------------------------/////////   
    /////--------------------------------------------------------Start to be modularized--------------------------------------------/////////
    /////------------------------------------------------------ ***************************----------------------------------/////////
    ////-----------------------------------------------------******************************-------------------------------------------////////   

    //-----------------------------------About Us-----------------------------------//
    //-----------------Create Modal---------
    $ionicModal.fromTemplateUrl('./templates/aboutUS-modal.html', {
        scope: $scope
        , animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.aboutModal = modal;
        // ---------retrieve fontsize------ 
        var settings = Settings.get();
        $scope.fontsizeVal = settings.fontSize;

    });

    $scope.openAboutModal = function () {
        $scope.aboutModal.show();
    };

    $scope.closeAboutModal = function (fontsizeVal) {
        //saves fontSize value

        $scope.aboutModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.aboutModal.remove();
    });

    // Execute action on hide modal
    $scope.$on('aboutModal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('aboutModal.removed', function () {
        // Execute action
    });

    //-----------------------------------Fnt Size Modal implementation-----------------------------------//


    //-----------------Create Modal---------
    $ionicModal.fromTemplateUrl('./templates/fontSize-modal.html', {
        scope: $scope
        , animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.fontModal = modal;
        // ---------retrieve fontsize------ 
        var settings = Settings.get();
        $scope.fontsizeVal = settings.fontSize;

    });

    $scope.openModal = function () {
        $scope.fontModal.show();
    };

    $scope.closeModal = function (fontsizeVal) {
        //saves fontSize value
        Settings.saveSettings(fontsizeVal);
        Settings.all();
        $scope.fontModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.fontModal.remove();
    });

    // Execute action on hide modal
    $scope.$on('fontModal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('fontModal.removed', function () {
        // Execute action
    });

    //-----------------------------------Setting menu implementation-----------------------------------//
    // Triggered on a button click, or some other target
    $scope.showMenu = function () {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {
                    text: 'Change Song Font Size'
                }








































                
                , {
                    text: 'About'
                }
     ]
            , titleText: 'Settings'
            , cancelText: 'Cancel'
            , cancel: function () {
                // add cancel code..
            }
            , buttonClicked: function (index) {
                if (index == 0) {
                    $scope.openModal();
                }

                if (index == 1) {

                    $scope.openAboutModal();
                }
                return true;
            }
        });
    };


})

.controller('CategDetailCtrl', function ($scope, $stateParams, Tags) {
    $scope.tag = Tags.get($stateParams.tag_id);
    $scope.songs = Tags.get_songs($stateParams.tag_id);
})


//.controller('FavSongCtrl', function ($scope, Favs, Songs) {
//    $scope.$on('$ionicView.beforeEnter', function () {
//
//        var favId = 1;
//        var favsongsList = Favs.get(favId).song_list;
//        var favsongs = [];
//        console.log("fav song flag" + favsongsList);
//        for (var i = 0; i < favsongsList.length; i++) {
//            favsongs.push(
//                Songs.get(favsongsList[i])
//            );
//            console.log("fav song flag" + Songs.get(favsongsList[i]).fav_flg);
//        }
//
//        $scope.favsongs = favsongs;
//    });
//
//
//})




.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A'
        , link: function (scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function (value) {
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function () {
                $rootScope.hideTabs = false;
            });
        }
    };
});