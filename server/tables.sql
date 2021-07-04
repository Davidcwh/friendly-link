DROP TABLE IF EXISTS Users, Links, Clicks;

CREATE TABLE Users (
    userId  text primary key,
    email   text
);

CREATE TABLE Links (
    shortCode   text primary key,
    originalUrl text,
    hasProtocol boolean,
    dateCreated date DEFAULT CURRENT_DATE,
    userId      text REFERENCES Users(userId)
        ON DELETE CASCADE
);

CREATE TABLE Clicks (
    clickId     serial,
    clickDate   date DEFAULT CURRENT_DATE,
    shortCode   text REFERENCES Links(shortCode)
        ON DELETE CASCADE
);
