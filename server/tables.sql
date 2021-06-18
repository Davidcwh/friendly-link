CREATE TABLE IF NOT EXISTS
            Links  (
                shortCode   text primary key,
                originalUrl text,
                hasProtocol boolean
            )