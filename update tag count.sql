DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTagCount`()
    NO SQL
BEGIN

DECLARE v_finished INTEGER DEFAULT 0;
DECLARE v_tag INTEGER DEFAULT 0;
DECLARE v_count INTEGER DEFAULT 0;
DEClARE tag_cursor CURSOR FOR 
 SELECT id FROM tags;
 
 
        
OPEN tag_cursor;
LOOP 

 FETCH tag_cursor INTO v_tag;
    select count(*) INTO v_count from song_tags WHERE tag_id = v_tag;
    update tags set songs_count= v_count where id = v_tag;

END LOOP;
 
CLOSE tag_cursor;
 
END$$
DELIMITER ;