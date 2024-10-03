CREATE TABLE catalogs(
  id SERIAL PRIMARY KEY,
  "userId" INT  REFERENCES "Users" (id),
  catalogName VARCHAR(160) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
  );


CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE users_to_conversation(
  "userId" INT NOT NULL REFERENCES "Users" (id),
  "conversationId" INT NOT NULL REFERENCES conversations (id),
  blackList BOOLEAN,
  favoriteList BOOLEAN,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp,
  PRIMARY KEY( userId, conversationId)
);
CREATE TABLE catalog_to_conversation(
  catalogId INT NOT NULL REFERENCES catalogs (id),
  conversationId INT NOT NULL REFERENCES conversations (id),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp,
  PRIMARY KEY( catalogId, conversationId)
);



CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Users" (id),
  body TEXT NOT NULL,
  "conversationId" INT NOT NULL REFERENCES conversations (id),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);