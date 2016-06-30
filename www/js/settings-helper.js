
function retrieveSettings($cordovaSQLite) {
    var setting = [];
    var query = "SELECT * FROM setting";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
        console.log("getting setting from db");
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {

                setting.push({
                      fontSize: res.rows.item(i).font_size
                    , version: res.rows.item(i).version                
                });

             console.log("settings"+setting);
            }

        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>" + err);
    });
    console.log("getting songs from db done");
    return setting;
}

function saveSettings($cordovaSQLite,fontsizeVal) {
    /*updates the status  on fav_flg in the song table */
    var DEFAULTSETTINGINDEX = "setting";
    var query1 = "UPDATE setting SET font_size = "+fontsizeVal+" where key = ?";
    $cordovaSQLite.execute(db, query1,DEFAULTSETTINGINDEX).then(function (res) {}, function (err) {
        console.error(err);
    });
}