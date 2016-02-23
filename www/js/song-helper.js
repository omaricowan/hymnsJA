function retrieveSongs($cordovaSQLite){
    var songs =[];
		var query = "SELECT * FROM SongList";		 
		$cordovaSQLite.execute(db, query, []).then(function(res) {
            console.log("getting songs from db");
        if(res.rows.length > 0) {           
             for (var i=0; i<res.rows.length; i++) {

				  songs.push({   
					id: res.rows.item(i).ID,
                    song_name: res.rows.item(i).SongTitle,
					song_detail: res.rows.item(i).Lyrics,
                    year: res.rows.item(i).Year,
                    tags: res.rows.item(i).Tags,
                    author: res.rows.item(i).Songwriter,
                    copyright: res.rows.item(i).Copyright,
                    fav_flg: res.rows.item(i).fav_flg,
					first_line:	res.rows.item(i).FirstLine 
                    });

             }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>"+err);
    });
    
    return songs;
}


function saveFav($cordovaSQLite,song){
    
        //checks if song already exist in favourite list
    
        //retrieves my_favs
           
            favs=[];
             var query = "SELECT * FROM my_favs where ID = 1";
             $cordovaSQLite.execute(db, query, []).then(function(res) {
                 if(res.rows.length > 0) {            
                     for (var i=0; i<res.rows.length; i++) {

                          favs.push({   
                            id: res.rows.item(i).ID,                
                            song_list: res.rows.item(i).songs.split(',')			
                            });
                     }

                     console.log("Rows selected :" +favs.length)
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>"+err);
            });

        //check is exist
           // var booleanFav = favs[0].song_list.contains(song.id)
           
        
        // if exist then do nothing
            console.log("fav:"+favs);
    
    
        //else
            //updates fav_flg
            var query2 = "UPDATE songList SET fav_flg = 'Y' where ID = ?";
              $cordovaSQLite.execute(db, query2, [song.id]).then(function(res) {
              console.log("Rows Updated: " + res.rowsAffected );       
            }, function (err) {
              console.error(err);
            });
            // and update fav list songs
            var query2 = "UPDATE my_favs SET songList = ? where ID = 1";
              $cordovaSQLite.execute(db, query2, [favs[0].song_list]).then(function(res) {
              console.log("Rows Updated: " + res.rowsAffected );       
            }, function (err) {
              console.error(err);
            });
    
}