CREATE DATABASE online_chess;

USE online_chess;

-- tables
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) UNIQUE,
email VARCHAR(255) UNIQUE,
password VARCHAR(255) UNIQUE
);

CREATE TABLE user_info(
user_id INT,
user_rank ENUM('beginner','intermediate','advanced','expert') DEFAULT 'beginner',
user_points INT DEFAULT 1000,
KEY userID(user_id),
CONSTRAINT userID FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



-- procedures
DELIMITER $$
CREATE PROCEDURE createUser(
IN _username VARCHAR(255),
IN _email VARCHAR(255),
IN _password VARCHAR(255)
)
BEGIN
DECLARE userID INT;
INSERT INTO users(username,email,password) VALUES (_username,_email,_password);
SELECT id INTO userId FROM users WHERE username=_username;
INSERT INTO user_info(user_id) VALUE(userId);
END $$
DELIMITER ;

-- Queries
SELECT * FROM users;
SELECT * FROM user_info;

