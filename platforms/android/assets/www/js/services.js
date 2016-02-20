angular.module('starter.services', [])

.factory('Favs', function($cordovaSQLite,$parse) {
  // Might use a resource here that returns a JSON array
	var favs;
	var songlength =[];
	favs = [];	
		var query = "SELECT * FROM my_favs";		 
		$cordovaSQLite.execute(db, query, []).then(function(res) {
        if(res.rows.length > 0) {            
             for (var i=0; i<res.rows.length; i++) {

				  favs.push({   
					id: res.rows.item(i).ID,
                    list_name: res.rows.item(i).list_name,
					song_list: res.rows.item(i).songs.split(','),
					song_count:	res.rows.item(i).songs.split(',').length			
                    });
             }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>"+err);
    });
 

  return {
    all: function() {
      return favs;
    },
    remove: function(fav) {
      favs.splice(favs.indexOf(fav), 1);
    },
    get: function(favId) {
      for (var i = 0; i < favs.length; i++) {
        if (favs[i].id === parseInt(favId)) {
          return favs[i];
        }
      }
      return null;
    }
  };
})


.factory('Tags', function($cordovaSQLite,$parse) {
  // Might use a resource here that returns a JSON array
	
	tags = [];	
		var query = "SELECT * FROM tags";		 
		$cordovaSQLite.execute(db, query, []).then(function(res) {
        if(res.rows.length > 0) {          
             for (var i=0; i<res.rows.length; i++) {

				  tags.push({   
					id: res.rows.item(i).ID,
                    tag_name: res.rows.item(i).Tag_name							
                    });
             }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>"+err);
    });
 

  return {
    all: function() {
      return tags;
    },
    remove: function(tag) {
      tags.splice(tags.indexOf(tag), 1);
    },
    get: function(tagId) {
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].id === parseInt(tagId)) {
          return tags[i];
        }
      }
      return null;
    }
  };
})


.factory('Songs', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array
	var songs
	songs = [];	
		var query = "SELECT * FROM SongList";		 
		$cordovaSQLite.execute(db, query, []).then(function(res) {
        if(res.rows.length > 0) {           
             for (var i=0; i<res.rows.length; i++) {

				  songs.push({   
					id: res.rows.item(i).ID,
                    song_name: res.rows.item(i).SongTitle,
					song_detail: res.rows.item(i).Lyrics,
                    year: res.rows.item(i).Year,
					first_line:	res.rows.item(i).FirstLine 
                    });

             }
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error("error=>"+err);
    });

  return {
    all: function() {
      return songs;
    },
    remove: function(song) {
      songs.splice(songs.indexOf(song), 1);
    },
    get: function(songId) {
      for (var i = 0; i < songs.length; i++) {
        if (songs[i].id === parseInt(songId)) {
          return songs[i];
        }
      }
      return null;
    }
  };
});
