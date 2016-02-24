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
     console.log("getting songs from db done");
    return songs;
}


function saveFav($cordovaSQLite,song){
    
        /* checks if song already exist in favourite list -*/
    
         /*retrieves my_favs */
           
            favs=[];
             var query = "SELECT * FROM my_favs where ID = 1;";
             $cordovaSQLite.execute(db, query, []).then(function(res) {
                 if(res.rows.length > 0) {            
                     for (var i=0; i<res.rows.length; i++) {

                          favs.push({   
                            id: res.rows.item(i).ID,                
                            song_list: res.rows.item(i).songs.split(',')			
                            });
                     }
                     
                        /*check is exist*/
         
           

                        /* if exist then do nothing*/
                            console.log("saveFav-55 Rows selected :" +favs.length);

                            fav = favs[0];
                            fav.song_list.push(song.id);
                            console.log("saveFav-55 fav-list:" +fav.song_list.toString());
                        /* else */
                            /*updates fav_flg */
                            var query1 = "UPDATE songList SET fav_flg = 'Y' where ID = ?";
                              $cordovaSQLite.execute(db, query1, [song.id]).then(function(res) {
                              console.log("Rows Updated: saveFav-63 " + res.rowsAffected );       
                            }, function (err) {
                              console.error(err);
                            });


                            /* and update fav list songs 
                            var query2 = "UPDATE my_favs SET songList = ? where ID = 1";
                                listparam = fav.song_list.toString();
                              $cordovaSQLite.execute(db, query2, [listparam]).then(function(res) {
                              console.log("Rows Updated: saveFav-72" + res.rowsAffected );       
                            }, function (err) {
                              console.error(err);
                            });
                     */
                     
                     
                     console.log("saveFav-79 Rows selected :" +favs.length);
                   
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>"+err);
            });

     
    
}