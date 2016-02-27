// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'jett.ionic.filter.bar', 'ngLetterAvatar'])


.run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    window.plugins.sqlDB.remove("sing.db", 2, function (error) {
        console.error("db already removed: " + error);

    });

    //Loads existing database
    window.plugins.sqlDB.copy("sing.db", function () {
        db = $cordovaSQLite.openDB("sing.db");
    }, function (error) {
        console.error("db already copied: " + error);
        db = $cordovaSQLite.openDB("sing.db");
    });
    db = $cordovaSQLite.openDB("sing.db");

})

.config(function ($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab'
        , abstract: true
        , templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.songs', {
        url: '/songs'
        , views: {
            'tab-songs': {
                templateUrl: 'templates/tab-songs.html'
                , controller: 'SongsCtrl'

            }
        }
    })

    .state('tab.song-detail', {
        url: '/songs/:songId'
        , views: {
            'tab-songs': {
                templateUrl: 'templates/song-detail.html'
                , controller: 'SongDetailCtrl'
            }
        }
    })

    .state('tab.categ', {
        url: '/categ'
        , views: {
            'tab-categ': {
                templateUrl: 'templates/tab-categ.html'
                , controller: 'CategCtrl'
            }
        }
    })

    .state('tab.categ-detail', {
        url: '/categ/:categId'
        , views: {
            'tab-categ': {
                templateUrl: 'templates/categ-detail.html'
                , controller: 'CategDetailCtrl'
            }
        }
    })

    .state('tab.favs', {
        url: '/favs'
        , views: {
            'tab-favs': {
                templateUrl: 'templates/tab-favs.html'
                , controller: 'FavCtrl'
            }
        }
    })

    .state('tab.fav-songs', {
        url: '/fav-songs/:id'
        , views: {
            'tab-favs': {
                templateUrl: 'templates/tab-fav-songs.html'
                , controller: 'FavSongCtrl'
            }
        }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/songs');

});