use musicshare;

-- Uncomment to be able to drop tables and run the entire script
SET FOREIGN_KEY_CHECKS = 0;

-- Create Users

DROP TABLE IF EXISTS users;

-- TODO Create username and password min validation

CREATE TABLE users (
  username      VARCHAR(255) primary key,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE
);

-- Create Artists

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
  artistId     VARCHAR(255) PRIMARY KEY,
  name         VARCHAR(255) NOT NULL
);

-- TODO Create popularity function?

-- Create Album

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
  albumId     VARCHAR(255) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  releaseDate DATE NOT NULL,
  genre1      VARCHAR(255),
  genre2      VARCHAR(255),
  genre3      VARCHAR(255),
  authorId    VARCHAR(255) NOT NULL,
  FOREIGN KEY (authorId) REFERENCES artists(artistId)
);

-- Create Song

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  songId      VARCHAR(255) PRIMARY KEY,
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
  albumId     VARCHAR(255),
  artistId    VARCHAR(255) NOT NULL,
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
  songId      VARCHAR(255) NOT NULL,
  FOREIGN KEY (playlistId) REFERENCES playlist(playlistId),
  FOREIGN KEY (songId)     REFERENCES songs(songId)
);
