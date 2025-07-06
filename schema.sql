-- schema.sql

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  time_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


-- Optional: insert a dummy user
INSERT INTO users (username, password)
VALUES ('testuser', '$2a$10$hashedPasswordHere');

-- Insert sample messages
INSERT INTO messages (text, user_id)
VALUES ('Hello world', 1);
