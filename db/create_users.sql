use musicshare;

-- Create Users

DROP TABLE IF EXISTS users;

-- TODO Create username and password min validation

CREATE TABLE users (
  username      VARCHAR(255) primary key,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE
)