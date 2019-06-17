use musicshare;

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
  songId      INT PRIMARY KEY AUTO_INCREMENT,
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
)

