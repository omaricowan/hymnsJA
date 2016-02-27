angular.module('starter.services', [])

.factory('Favs', function ($cordovaSQLite, $parse) {
    // Might use a resource here that returns a JSON array
    var favs;
    favs = retrieveFavs($cordovaSQLite);


    return {
        all: function () {
            return favs;
        }
        , remove: function (fav) {
            favs.splice(favs.indexOf(fav), 1);
        }
        , reload: function (fav) {
             favs = retrieveFavs($cordovaSQLite);
            return favs;
        }
        , get: function (favId) {
            console.log("selecting favs id" + favId);
            for (var i = 0; i < favs.length; i++) {
                if (favs[i].id === parseInt(favId)) {
                    return favs[i];
                }
            }
            return null;
        }
    };
})


.factory('Tags', function ($cordovaSQLite, $parse) {
    // Might use a resource here that returns a JSON array

    tags = [];
    var query = "SELECT * FROM tags order by Tag_name";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {

                tags.push({
                    id: res.rows.item(i).ID
                    , tag_name: res.rows.item(i).Tag_name
                });
            }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>" + err);
    });


    return {
        all: function () {
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
    };
})


.factory('Songs', function ($cordovaSQLite) {
    // Might use a resource here that returns a JSON array

    var songs = [];
    //retrives all songs from db
    songs = retrieveSongs($cordovaSQLite);

    return {
        all: function () {
            return songs;
        }
        , addFavSong: function (song) {

            console.log("updating:" + song.id);
            //save flg and add song to fav list
            saveFav($cordovaSQLite, song);
            songs = retrieveSongs($cordovaSQLite);

            //retrives updated songs from db


            return songs;
        }
        , remove: function (song) {
            songs.splice(songs.indexOf(song), 1);
        }
        , get: function (songId) {
            for (var i = 0; i < songs.length; i++) {
                if (songs[i].id === parseInt(songId)) {
                    return songs[i];
                }
            }
            return null;
        }
    };
});