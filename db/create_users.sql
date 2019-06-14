-- Create Users

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userId        INT PRIMARY KEY AUTO_INCREMENT,
  username      VARCHAR(255) NOT NULL,
  password      VARCHAR(255) NOT NULL
)