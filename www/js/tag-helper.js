function retrieveTags($cordovaSQLite) {
    tags = [];
    var query = "SELECT * FROM tags order by Tag_name";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {

                tags.push({
                    tag_id: res.rows.item(i).ID
                    , tag_name: res.rows.item(i).Tag_name
                });
            }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>" + err);
    });

    return tags;
}

function retrieveTagSongs($cordovaSQLite, tag_id) {
    var songs = [];
    var query = "SELECT * FROM SongList WHERE id in (SELECT song_id FROM  songs_tags WHERE tag_id = ?)";
    $cordovaSQLite.execute(db, query, [tag_id]).then(function (res) {
        console.log("getting songs from db");
        console.log("tagid: " + tag_id);
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {

                songs.push({
                    id: res.rows.item(i).ID
                    , song_name: res.rows.item(i).SongTitle
                    , song_detail: res.rows.item(i).Lyrics
                    , year: res.rows.item(i).Year
                    , tags: res.rows.item(i).Tags
                    , author: res.rows.item(i).Songwriter
                    , copyright: res.rows.item(i).Copyright
                    , fav_flg: res.rows.item(i).fav_flg
                    , first_line: res.rows.item(i).FirstLine
                });


            }

        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>" + err);
    });
    console.log("getting songs from db done");
    return songs;
}