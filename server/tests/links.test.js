const request = require("supertest");
const app = require("../server");
const db = require("../models/db");

beforeEach(async () => {
    const queryText = 
        `
        CREATE TABLE IF NOT EXISTS
            Users (
                userId  text primary key,
                email   text
            );

        CREATE TABLE IF NOT EXISTS
            Links  (
                shortCode   text primary key,
                originalUrl text,
                hasProtocol boolean,
                dateCreated date DEFAULT CURRENT_DATE,
                userId      text REFERENCES Users(userId)
                    ON DELETE CASCADE,
                cipherText  text,
                iv          text,
                salt        text
            );
        
        CREATE TABLE IF NOT EXISTS
            Clicks (
                clickId     serial,
                clickDate   date DEFAULT CURRENT_DATE,
                shortCode   text REFERENCES Links(shortCode)
                    ON DELETE CASCADE
            );`;

    await db.query(queryText)
        .then((res) => {
            console.log("Table creation success")
        })
        .catch((err) => {
            console.log(`Table creation error: ${err.stack}`);
        });
});

afterEach(async () => {
    const queryText = 
        `DROP TABLE IF EXISTS Users, Links, Clicks;`;

    await db.query(queryText)
        .then((res) => {
            console.log("Table Drop success")
        })
        .catch((err) => {
            console.log(`Table creation error: ${err.stack}`);
        });
})

afterAll(() => {
    db.end();
});

describe("POST /createShortUrl", () => {

    test("Non-User, No Protocol, Success 201", async () => {
        const url = "google.com";
        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url
            });
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(false);
    });

    test("Non-User, Has Protocol, Success 201", async () => {
        const url = "https://google.com";
        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url
            });
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(true);
    });

    test("User, No Protocol, No Password, Success 201", async () => {
        const url = "google.com";
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        const createUserResponse = await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                                                .catch(err => {
                                                    throw new Error(`User creation error: ${err.stack}`);
                                                });

        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url,
                userId
            });
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(false);
        expect(response.body).toHaveProperty("userId");
        expect(response.body.userId).toBe(userId);
    });

    test("User, Has Protocol, No Password, Success 201", async () => {
        const url = "https://google.com";
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        const createUserResponse = await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                                                .catch(err => {
                                                    throw new Error(`User creation error: ${err.stack}`);
                                                });

        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url,
                userId
            });
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(true);
        expect(response.body).toHaveProperty("userId");
        expect(response.body.userId).toBe(userId);
    });

    test("User, No Protocol, Has Password, Success 201", async () => {
        const url = "google.com";
        const cipherText = "randomCipherText";
        const iv = "randomiv";
        const salt = "randomSalt";
        const encryption = JSON.stringify({ cipherText, iv, salt });
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url,
                userId,
                encryption
            });

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(false);
        expect(response.body).toHaveProperty("userId");
        expect(response.body.userId).toBe(userId);

        const encryptionResponse = await db.query('SELECT cipherText, iv, salt FROM Links WHERE shortCode = $1', [response.body.shortCode])
                                                .catch(err => {
                                                    throw new Error(`Encryption retrieval error: ${err.stack}`);
                                                });

        expect(encryptionResponse.rowCount).toBe(1);
        expect(encryptionResponse.rows[0]).toHaveProperty("ciphertext");
        expect(encryptionResponse.rows[0].ciphertext).toBe(cipherText);
        expect(encryptionResponse.rows[0]).toHaveProperty("iv");
        expect(encryptionResponse.rows[0].iv).toBe(iv);
        expect(encryptionResponse.rows[0]).toHaveProperty("salt");
        expect(encryptionResponse.rows[0].salt).toBe(salt);
    });

    test("User, Has Protocol, Has Password, Success 201", async () => {
        const url = "https://google.com";
        const cipherText = "randomCipherText";
        const iv = "randomiv";
        const salt = "randomSalt";
        const encryption = JSON.stringify({ cipherText, iv, salt });
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        const createUserResponse = await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                                                .catch(err => {
                                                    throw new Error(`User creation error: ${err.stack}`);
                                                });

        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url,
                userId,
                encryption
            });

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("originalUrl");
        expect(response.body.originalUrl).toBe(url);
        expect(response.body).toHaveProperty("shortCode");
        expect(response.body).toHaveProperty("shortUrl");
        expect(response.body).toHaveProperty("hasProtocol");
        expect(response.body.hasProtocol).toBe(true);
        expect(response.body).toHaveProperty("userId");
        expect(response.body.userId).toBe(userId);

        const encryptionResponse = await db.query('SELECT cipherText, iv, salt FROM Links WHERE shortCode = $1', [response.body.shortCode])
                                                .catch(err => {
                                                    throw new Error(`Encryption retrieval error: ${err.stack}`);
                                                });

        expect(encryptionResponse.rowCount).toBe(1);
        expect(encryptionResponse.rows[0]).toHaveProperty("ciphertext");
        expect(encryptionResponse.rows[0].ciphertext).toBe(cipherText);
        expect(encryptionResponse.rows[0]).toHaveProperty("iv");
        expect(encryptionResponse.rows[0].iv).toBe(iv);
        expect(encryptionResponse.rows[0]).toHaveProperty("salt");
        expect(encryptionResponse.rows[0].salt).toBe(salt);
    });

    test("Invalid Url 500", async () => {
        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: "invalidUrl"
            });

        expect(response.error.text).toBe("\"Invalid url given\"");
        expect(response.statusCode).toBe(500);
    });

    test("DB insert error 500", async () => {
        await db.query('DROP TABLE Clicks, Links').catch(err => {
            throw new Error('Error dropping Links table from test db');
        });

        const url = "https://google.com";
        const response = await request(app)
                .post("/createShortUrl")
                .send({
                    originalUrl: url
                });

        expect(response.statusCode).toBe(500);
        expect(response.error.text).toBe("\"Could not save url given\"");
    });
});

describe("GET /getOriginalUrl/:shortcode", () => {
        test("No Protocol, Success 200", async () => {
            const url = "google.com";
            const shortCode = "randomShortCode";
            const hasProtocol = false;

            await db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol) VALUES ($1, $2, $3)', 
                        [shortCode, url, hasProtocol],).catch(err => {
                            throw new Error('Error inserting link');
                        })

            const response = await request(app)
                                .get(`/getOriginalUrl/${shortCode}`);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("originalUrl");
            expect(response.body.originalUrl).toBe("//" + url);
        });

        test("Has Protocol, Success 200", async () => {
            const url = "https://google.com";
            const shortCode = "randomShortCode";
            const hasProtocol = true;

            await db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol) VALUES ($1, $2, $3)', 
                        [shortCode, url, hasProtocol],).catch(err => {
                            throw new Error('Error inserting link');
                        })

            const response = await request(app)
                                .get(`/getOriginalUrl/${shortCode}`);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("originalUrl");
            expect(response.body.originalUrl).toBe(url);
        });

        test("Error Retrieving Original URL 500", async () => {
            const shortCode = "randomShortCode";

            await db.query('DROP TABLE Clicks, Links').catch(err => {
                throw new Error('Error dropping Links table from test db');
            });

            const response = await request(app)
                                .get(`/getOriginalUrl/${shortCode}`);
            
            expect(response.statusCode).toBe(500);
        });

        test("No URL associated with given short code 500", async () => {
            const shortCode = "randomShortCode";

            const response = await request(app)
                                .get(`/getOriginalUrl/${shortCode}`);
            
            expect(response.statusCode).toBe(404);
        });

        test("Click not created, Success 200", async () => {
            const url = "google.com";
            const shortCode = "randomShortCode";
            const hasProtocol = false;

            await db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol) VALUES ($1, $2, $3)', 
                        [shortCode, url, hasProtocol],).catch(err => {
                            throw new Error('Error inserting link');
                        });

            await db.query('DROP TABLE Clicks').catch(err => {
                throw new Error('Error dropping Clicks table from test db');
            });

            const response = await request(app)
                                .get(`/getOriginalUrl/${shortCode}`);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("originalUrl");
            expect(response.body.originalUrl).toBe("//" + url);
        });
});

describe("GET /getLinkEncryption/:shortcode", () => {
    test("Success 200", async () => {
        const url = "google.com";
        const shortCode = "randomShortCode";
        const hasProtocol = false;
        const cipherText = "randomCipherText";
        const iv = "randomiv";
        const salt = "randomSalt";
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId, cipherText, iv, salt) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                    [shortCode, url, hasProtocol, userId, cipherText, iv, salt])
                    .catch(err => {
                        throw new Error(`Link creation error: ${err.stack}`);
                    });

        const response = await request(app)
                    .get(`/getLinkEncryption/${shortCode}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("encryption");
        expect(response.body.encryption).toHaveProperty("cipherText");
        expect(response.body.encryption.cipherText).toBe(cipherText);
        expect(response.body.encryption).toHaveProperty("iv");
        expect(response.body.encryption.iv).toBe(iv);
        expect(response.body.encryption).toHaveProperty("salt");
        expect(response.body.encryption.salt).toBe(salt);
    });

    test("Error retrieving link encryption data 500", async () => {
        const shortCode = "randomShortCode";

        await db.query('DROP TABLE Clicks, Links').catch(err => {
            throw new Error('Error dropping Links table from test db');
        });

        const response = await request(app)
                            .get(`/getLinkEncryption/${shortCode}`);
        
        expect(response.statusCode).toBe(500);
    });

    test("No URL associated with given short code 404", async () => {
        const shortCode = "randomShortCode";

        const response = await request(app)
                            .get(`/getLinkEncryption/${shortCode}`);
        
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /getUserLinks/:userid", () => {
    test("Success 200", async () => {
        const url1 = "google.com";
        const shortCode1 = "randomShortCode1";
        const hasProtocol1 = false;

        const url2 = "facebook.com";
        const shortCode2 = "randomShortCode2";
        const hasProtocol2 = false;

        const url3 = "youtube.com";
        const shortCode3 = "randomShortCode3";
        const hasProtocol3 = false;

        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode1, url1, hasProtocol1, userId])
                    .catch(err => {
                        throw new Error(`Link 1 creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode2, url2, hasProtocol2, userId])
                    .catch(err => {
                        throw new Error(`Link 2 creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode3, url3, hasProtocol3, userId])
                    .catch(err => {
                        throw new Error(`Link 3 creation error: ${err.stack}`);
                    });

        const response = await request(app)
                .get(`/getUserLinks/${userId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        
        expect(response.body[0]).toHaveProperty("isLocked");
        expect(response.body[0].isLocked).toBe(false);
        expect(response.body[0]).toHaveProperty("originalurl");
        expect(response.body[0].originalurl).toBe(url1);
        expect(response.body[0]).toHaveProperty("shortcode");
        expect(response.body[0].shortcode).toBe(shortCode1);
        expect(response.body[0]).toHaveProperty("hasprotocol");
        expect(response.body[0].hasprotocol).toBe(hasProtocol1);

        expect(response.body[1]).toHaveProperty("isLocked");
        expect(response.body[1].isLocked).toBe(false);
        expect(response.body[1]).toHaveProperty("originalurl");
        expect(response.body[1].originalurl).toBe(url2);
        expect(response.body[1]).toHaveProperty("shortcode");
        expect(response.body[1].shortcode).toBe(shortCode2);
        expect(response.body[1]).toHaveProperty("hasprotocol");
        expect(response.body[1].hasprotocol).toBe(hasProtocol2);

        expect(response.body[2]).toHaveProperty("isLocked");
        expect(response.body[2].isLocked).toBe(false);
        expect(response.body[2]).toHaveProperty("originalurl");
        expect(response.body[2].originalurl).toBe(url3);
        expect(response.body[2]).toHaveProperty("shortcode");
        expect(response.body[2].shortcode).toBe(shortCode3);
        expect(response.body[2]).toHaveProperty("hasprotocol");
        expect(response.body[2].hasprotocol).toBe(hasProtocol3);
    });

    test("Error retrieving user links 500", async () => {
        const userId = "randomUserId";

        await db.query('DROP TABLE Clicks, Links').catch(err => {
            throw new Error('Error dropping Links table from test db');
        });

        const response = await request(app)
                .get(`/getUserLinks/${userId}`);
        
        expect(response.statusCode).toBe(500);
    });
});
