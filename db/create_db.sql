use musicshare;

-- Uncomment to be able to drop tables and run the entire script
SET FOREIGN_KEY_CHECKS = 0;

-- Create Users

DROP TABLE IF EXISTS users;

INSERT INTO albums (name, releaseDate, genre1, genre2, genre3, authorId) VALUES ('Dark side of the moon', '1973-03-01', 'rock', 'prog rock', 'psych', 1);

-- TODO Create username and password min validation

CREATE TABLE users (
  username      VARCHAR(255) primary key,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE
);

-- Create Artists

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
  artistId     INT PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(255) NOT NULL
);

-- TODO Create popularity function?

-- Create Album

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
  albumId     INT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  releaseDate DATE NOT NULL,
  genre1      VARCHAR(255),
  genre2      VARCHAR(255),
  genre3      VARCHAR(255),
  authorId    INT NOT NULL,
  FOREIGN KEY (authorId) REFERENCES artists(artistId)
);

-- Create Song

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  songId      INT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  length      INT NOT NULL,
  tempo       INT,
  energy      FLOAT,
  valence     FLOAT,
  genre1      VARCHAR(255),
  genre2      VARCHAR(255),
  genre3      VARCHAR(255),
  releaseDate DATE,
  timesUsed   INT,
  albumId     INT,
  artistId    INT NOT NULL,
  FOREIGN KEY (albumId)  REFERENCES albums(albumId),
  FOREIGN KEY (artistId) REFERENCES artists(artistId)
);

-- Playlists

DROP TABLE IF EXISTS playlists;

CREATE TABLE playlist (
  playlistId   INT PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(255) NOT NULL,
  isPrivate    BIT NOT NULL,
  likes        INT NOT NULL,
  dislikes     INT NOT NULL,
  numSongs     INT NOT NULL,
  length       INT NOT NULL,
  primaryGenre VARCHAR(255)
);

DROP TABLE IF EXISTS playlistEntry;

CREATE TABLE playlistEntry (
  entryId     INT PRIMARY KEY AUTO_INCREMENT,
  playlistId  INT NOT NULL,
  songId      INT NOT NULL,
  FOREIGN KEY (playlistId) REFERENCES playlist(playlistId),
  FOREIGN KEY (songId)     REFERENCES songs(songId)
);
