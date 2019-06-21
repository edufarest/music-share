use musicshare;

-- Uncomment to be able to drop tables and run the entire script
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS favPlaylist;
DROP TABLE IF EXISTS playlistEntry;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS users;



-- Create Users

-- TODO Create username and password min validation

CREATE TABLE users (
                     username      VARCHAR(255) primary key,
                     password      VARCHAR(255) NOT NULL,
                     email         VARCHAR(255) NOT NULL UNIQUE
);

-- Create Artists



CREATE TABLE artists (
                       artistId     VARCHAR(255) PRIMARY KEY,
                       name         VARCHAR(255) NOT NULL
);

-- TODO Create popularity function?

-- Create Album



CREATE TABLE albums (
                      albumId     VARCHAR(255) PRIMARY KEY,
                      name        VARCHAR(255) NOT NULL,
                      releaseDate DATE NOT NULL,
                      genre1      VARCHAR(255),
                      genre2      VARCHAR(255),
                      genre3      VARCHAR(255),
                      authorId    VARCHAR(255) NOT NULL,
                      image       VARCHAR(255),
                      FOREIGN KEY (authorId) REFERENCES artists(artistId)
);

-- Create Song

CREATE TABLE songs (
                     songId      VARCHAR(255) PRIMARY KEY,
                     title       VARCHAR(255) NOT NULL,
                     length      INT NOT NULL,
                     tempo       INT,
                     energy      FLOAT,
                     valence     FLOAT,
                     loudness    FLOAT,
                     genre1      VARCHAR(255),
                     genre2      VARCHAR(255),
                     genre3      VARCHAR(255),
                     releaseDate DATE,
                     timesUsed   INT,
                     albumId     VARCHAR(255),
                     artistId    VARCHAR(255) NOT NULL,
                     FOREIGN KEY (albumId)  REFERENCES albums(albumId),
                     FOREIGN KEY (artistId) REFERENCES artists(artistId)
);

-- Playlists



CREATE TABLE playlist (
                        playlistId   INT PRIMARY KEY AUTO_INCREMENT,
                        name         VARCHAR(255) NOT NULL,
                        isPrivate    BIT NOT NULL,
                        likes        INT NOT NULL DEFAULT 0,
                        dislikes     INT NOT NULL DEFAULT 0,
                        numSongs     INT NOT NULL DEFAULT 0,
                        length       INT NOT NULL DEFAULT 0,
                        primaryGenre VARCHAR(255) DEFAULT '',
                        owner        VARCHAR(255) NOT NULL,
                        tempo       INT,
                        energy      FLOAT,
                        valence     FLOAT,
                        loudness    FLOAT,
                        FOREIGN KEY (owner) REFERENCES users(username)
);



CREATE TABLE playlistEntry (
                             entryId     INT PRIMARY KEY AUTO_INCREMENT,
                             playlistId  INT NOT NULL,
                             songId      VARCHAR(255) NOT NULL,
                             FOREIGN KEY (playlistId) REFERENCES playlist(playlistId),
                             FOREIGN KEY (songId)     REFERENCES songs(songId)
);

CREATE TABLE favPlaylist (
                            favoriteId  INT PRIMARY KEY AUTO_INCREMENT,
                            playlistId  INT NOT NULL,
                            username    VARCHAR(255) not null,
                            FOREIGN KEY (playlistId) REFERENCES playlist(playlistId),
                            FOREIGN KEY (username)   REFERENCES users(username)
);


-- TRIGGERS

-- SONG IS ADDED/REMOVED TO PLAYLIST (UPDATE LENGTH, NUMOFUSES, PRIMARY GENRE?)

DROP TRIGGER IF EXISTS after_entry_update;
DROP TRIGGER IF EXISTS after_entry_delete;
DROP TRIGGER IF EXISTS after_playlist_delete;

select * from songs;
select * from playlist;

DELIMITER //

CREATE TRIGGER after_entry_update
  AFTER INSERT ON playlistEntry
  FOR EACH ROW
BEGIN

  UPDATE songs SET timesUsed = timesUsed + 1
  WHERE songId=NEW.songId;

  SET @tempo := (select avg(s.tempo) from playlist inner join playlistEntry pE on playlist.playlistId = pE.playlistId
    inner join songs s on pE.songId = s.songId
    WHERE playlist.playlistId=NEW.playlistId
    group by playlist.playlistId);

  UPDATE playlist
    SET tempo = @tempo
    WHERE playlistId=NEW.playlistId;

end //

CREATE TRIGGER after_playlist_delete
  AFTER DELETE ON playlist
  FOR EACH ROW
BEGIN
  DELETE FROM playlistEntry WHERE playlistId=OLD.playlistId;
end //

CREATE TRIGGER after_entry_delete
  AFTER DELETE ON playlistEntry
  FOR EACH ROW
BEGIN
  UPDATE songs SET timesUsed = timesUsed - 1
  WHERE songId=OLD.songId;
end //


select avg(s.tempo), avg(s.valence), avg(s.energy), avg(s.loudness) from playlist inner join playlistEntry pE on playlist.playlistId = pE.playlistId
inner join songs s on pE.songId = s.songId group by playlist.playlistId;


SELECT playlist.playlistId, playlist.name as playlist, owner, title, s.length,
       album.name, artist.name, playlist.tempo, playlist.valence, playlist.energy, playlist.loudness FROM playlist
          INNER JOIN playlistEntry pE on playlist.playlistId = pE.playlistId
          INNER JOIN songs s on pE.songId = s.songId
          INNER JOIN albums album on s.albumId = album.albumId
          INNER JOIN artists artist on album.authorId = artist.artistId
          ORDER BY playlist.playlistId DESC LIMIT 20;


select * from playlist inner join favPlaylist fP on playlist.playlistId = fP.playlistId and username = 'jose';