CREATE TABLE catalogs(
  id SERIAL PRIMARY KEY,
  userId INT  REFERENCES "Users" (id),
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

CREATE TABLE users_to_conversation(
  userId INT NOT NULL REFERENCES "Users" (id),
  conversationId INT NOT NULL REFERENCES conversations (id),
  PRIMARY KEY( userId, conversationId)
);
CREATE TABLE catalog_to_conversation(
  catalogId INT NOT NULL REFERENCES catalogs (id),
  conversationId INT NOT NULL REFERENCES conversations (id),
  PRIMARY KEY( catalogId, conversationId)
);



CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender INT NOT NULL REFERENCES "Users" (id),
  body TEXT NOT NULL,
  "conversation" INT NOT NULL REFERENCES conversations (id),
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp

);