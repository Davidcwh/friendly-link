const request = require("supertest");
const app = require("../server");
const db = require("../models/db");
const User = require('../models/users.model');

beforeEach(async () => {
    const queryText = 
        `
        CREATE TABLE IF NOT EXISTS
            Users (
                userId  text primary key,
                email   text
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
        `DROP TABLE IF EXISTS Users;`;

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

describe("User Model", () => {
    test("Test Constructor", () => {
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        User({ userId, email});
    })
});

describe("POST /createUser", () => {
    test("Success 201", async () => {
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        const response = await request(app)
            .post("/createUser")
            .send({
                userId,
                email
            });

        expect(response.statusCode).toBe(201);
    });

    test("Could not save user 500", async () => {
        const userId = "randomUserId";
        const email = "randomEmail@email.com";

        const response = await request(app)
            .post("/createUser")
            .send({
                userId,
                email
            });

        expect(response.statusCode).toBe(201);

        const duplicateResponse = await request(app)
            .post("/createUser")
            .send({
                userId,
                email
            });

        expect(duplicateResponse.statusCode).toBe(500);
    });
});