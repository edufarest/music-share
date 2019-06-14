-- Create Users

DROP TABLE IF EXISTS users;

-- TODO Create username and password min validation

CREATE TABLE users (
  userId        INT PRIMARY KEY AUTO_INCREMENT,
  username      VARCHAR(255) NOT NULL,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL
)