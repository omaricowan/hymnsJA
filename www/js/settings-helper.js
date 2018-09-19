function retrieveSettings($cordovaSQLite) {
    var setting = [];
    var query = "SELECT * FROM setting";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
        console.log("retrieveSettings");
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {

                setting.push({
                    fontSize: res.rows.item(i).font_size
                    , version: res.rows.item(i).version
                });
                console.log("select Settings with" + setting[i].fontSize);

            }
            console.log("settings");
        } else {
            console.log("No results found");
        }
        return setting;
    }, function (err) {
        console.error("error=>" + err);
    });

}

function saveSettings($cordovaSQLite, fontsizeVal) {
    /*updates the status  on fav_flg in the song table */
    var DEFAULTSETTINGINDEX = "setting";
    var fontSize = fontsizeVal; //+ "px";
    console.log("Updating Settings with" + fontSize);
    var query1 = "UPDATE setting SET font_size ='" + fontSize + "' where key = '" + DEFAULTSETTINGINDEX + "'";
    $cordovaSQLite.execute(db, query1, null).then(function (res) {
        console.log("Updating Settings 1");
    }, function (err) {
        console.error(err);
    });
    console.log("Updated Settings 2");
}