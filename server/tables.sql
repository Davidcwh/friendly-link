DROP TABLE IF EXISTS Users, Links;

CREATE TABLE Users (
    userId  text primary key,
    email   text
);

CREATE TABLE Links (
    shortCode   text primary key,
    originalUrl text,
    hasProtocol boolean,
    userId      text REFERENCES Users(userId)
        ON DELETE CASCADE
);
