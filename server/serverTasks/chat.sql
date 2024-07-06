CREATE TABLE catalogs(
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES "Users" (id),
  catalogName VARCHAR(160) NOT NULL,
  chats  INT NOT NULL REFERENCES conversations (id)
  

);


CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  participants INT NOT NULL,
  blackList BOOLEAN,
  favoriteList BOOLEAN,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp


);
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender INT NOT NULL REFERENCES "Users" (id),
  body TEXT NOT NULL,
  "conversation" INT NOT NULL REFERENCES conversations (id),
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp

);