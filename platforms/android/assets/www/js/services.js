angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
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
             console.log("SELECTED -> " + res.rows.item(0).ID + " " + res.rows.item(0).SongTitle);
             for (var i=0; i<res.rows.length; i++) {

				  songs.push({   
					id: res.rows.item(i).ID,
                    song_name: res.rows.item(i).SongTitle,
					song_detail: res.rows.item(i).Lyrics,
                    year: res.rows.item(i).Year
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
