select
  table2.song_id,
  SUBSTRING_INDEX(SUBSTRING_INDEX(table2.tag_id, ',', numbers.numb), ',', -1) tag
from
  numbers inner join table2
  on CHAR_LENGTH(table2.tag_id)
     -CHAR_LENGTH(REPLACE(table2.tag_id, ',', ''))>=numbers.numb-1
order by
 song_id, numb