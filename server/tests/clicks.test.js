const request = require("supertest");
const app = require("../server");
const db = require("../models/db");
const Clicks = require('../models/clicks.model')

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

describe("Clicks Model", () => {
    test("Test Constructor", () => {
        const shortCode = "randomShortCode";
        const clickId = "randomClickId"
        const clickDate = new Date().toJSON().slice(0,10);

        Clicks({ shortCode, clickId, clickDate});
    })
});

describe("GET /getTotalClickCount/:shortcode", () => {
    test("Click Count > 1, Success 200", async () => {
        const url = "google.com";
        const shortCode = "randomShortCode";
        const hasProtocol = false;

        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode, url, hasProtocol, userId])
                    .catch(err => {
                        throw new Error(`Link creation error: ${err.stack}`);
                    });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        const response = await request(app)
                .get(`/getTotalClickCount/${shortCode}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("clickCount");
        expect(response.body.clickCount).toBe("3");
    });

    test("Click Count = 0, Success 200", async () => {
        const url = "google.com";
        const shortCode = "randomShortCode";
        const hasProtocol = false;

        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode, url, hasProtocol, userId])
                    .catch(err => {
                        throw new Error(`Link creation error: ${err.stack}`);
                    });

        const response = await request(app)
                .get(`/getTotalClickCount/${shortCode}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("clickCount");
        expect(response.body.clickCount).toBe("0");
    });

    test("Error retrieving link click count 500", async () => {
        const shortCode = "randomShortCode1";

        await db.query('DROP TABLE Clicks, Links').catch(err => {
            throw new Error('Error dropping Links table from test db');
        });

        const response = await request(app)
                .get(`/getTotalClickCount/${shortCode}`);
        
        expect(response.statusCode).toBe(500);
    });
});

describe("GET /getClickCountByDate/:shortcode", () => {
    test("Success 200", async () => {
        const url = "google.com";
        const shortCode = "randomShortCode";
        const hasProtocol = false;

        const userId = "randomUserId";
        const email = "randomEmail@email.com";
        const currentDate = new Date().toJSON().slice(0,10);

        await db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [userId, email])
                    .catch(err => {
                        throw new Error(`User creation error: ${err.stack}`);
                    });

        await  db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
                    [shortCode, url, hasProtocol, userId])
                    .catch(err => {
                        throw new Error(`Link creation error: ${err.stack}`);
                    });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        await db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode])
                .catch(err => {
                    throw new Error(`Click creation error: ${err.stack}`);
                });

        const response = await request(app)
                .get(`/getClickCountByDate/${shortCode}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("clickdate");
        expect(response.body[0].clickdate).toBe(currentDate);
        expect(response.body[0]).toHaveProperty("count");
        expect(response.body[0].count).toBe("3");
    });

    test("Error retrieving link click count by date 500", async () => {
        const shortCode = "randomShortCode1";

        await db.query('DROP TABLE Clicks, Links').catch(err => {
            throw new Error('Error dropping Links table from test db');
        });

        const response = await request(app)
                .get(`/getClickCountByDate/${shortCode}`);
        
        expect(response.statusCode).toBe(500);
    });
});
