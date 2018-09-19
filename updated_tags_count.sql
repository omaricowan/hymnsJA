UPDATE tags SET Songs_count = (select count(song_id)
										from songs_tags
								GROUP by tag_id  
								ORDER BY `songs_tags`.`tag_id`  ASC)
WHERE id IN (select tag_id
					from songs_tags
				GROUP by tag_id  
				ORDER BY `songs_tags`.`tag_id`  ASC)