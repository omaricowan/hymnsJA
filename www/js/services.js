angular.module('starter.services', [])


.factory('localDatabaseService', function ($ionicPlatform, $cordovaSQLite, $window) {
    console.log('getDatabase', db);
    // singleton
    return {
        getDatabase: function () {
            // promise
            return $ionicPlatform.ready(
                    function () {
                        // lazy init
                        if (!db) {
                            if ($window.cordova) {

                                // native
                                db = $cordovaSQLite.openDB("sing.db");

                                console.log('native db', db);
                            }
                        }
                    })
                .then(function () {
                    // for chaining use
                    return db;
                });
        }
    };
})

.factory('Favs', function ($cordovaSQLite, $parse) {
    // Might use a resource here that returns a JSON array

    var favs = [];
    return {
        reload: function () {
            favs = retrieveFavs($cordovaSQLite);
            return favs;
        }
        , remove: function (fav) {
            favs.splice(favs.indexOf(fav), 1);
        }
        , load: function () {
            favs = retrieveFavs($cordovaSQLite);
            return favs;
        }
        , get: function (favId) {
            favs = retrieveFavs($cordovaSQLite);
            for (var i = 0; i < favs.length; i++) {
                if (favs[i].id === parseInt(favId)) {
                    console.log("Match Fav ID");
                    return favs[i];
                }
            }
            return null;
        }
    };
})


.factory('Tags', function ($cordovaSQLite, $parse) {
    // Might use a resource here that returns a JSON array
    var tags = [];
    //tags = retrieveTags($cordovaSQLite);
    var songs = [];

    return {
        all: function () {
            tags = retrieveTags($cordovaSQLite);
            return tags;
        }
        , remove: function (tag) {
            tags.splice(tags.indexOf(tag), 1);
        }
        , get: function (tagId) {
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].id === parseInt(tagId)) {
                    return tags[i];
                }
            }
            return null;
        }
        , get_songs: function (tagId) {
            tags = retrieveTags($cordovaSQLite);
            songs = retrieveTagSongs($cordovaSQLite, tagId)
            return songs;
        }

    };
})


.factory('Songs', function ($cordovaSQLite) {
    // Might use a resource here that returns a JSON array

    var songs = [];
    //retrives all songs from db
    //songs = retrieveSongs($cordovaSQLite);

    return {
        all: function () {
            songs = retrieveSongs($cordovaSQLite);
            return songs;
        }
        , removeFavSong: function (song) {

            console.log("Removing:" + song.id);
            //save flg and add song to fav list
            removeFav($cordovaSQLite, song);

        }
        , addFavSong: function (song) {

            console.log("updating:" + song.id);
            //save flg and add song to fav list
            saveFav($cordovaSQLite, song);

        }
        , remove: function (song) {
            songs.splice(songs.indexOf(song), 1);
        }
        , get: function (songs, songId) {
            for (var i = 0; i < songs.length; i++) {
                if (songs[i].id === parseInt(songId)) {
                    return songs[i];
                }
            }
            return null;
        }
    };
})

.factory('Settings', function ($cordovaSQLite) {
    // Might use a resource here that returns a JSON array
    var setting = [];

    return {
        all: function () {
            setting = retrieveSettings($cordovaSQLite);
            console.log("setting all:" + setting);
            return setting;
        }
        , get: function () {
            setting = retrieveSettings($cordovaSQLite)
            console.log("setting get:" + setting);
            for (var i = 0; i < setting.length; i++) {
                return setting[i];
            }
            return null;

        }
        , saveSettings: function (fontsizeVal) {

            saveSettings($cordovaSQLite, fontsizeVal);
        }
    };
});