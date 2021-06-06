const request = require("supertest");
const app = require("../server");
const db = require("../models/db");

beforeEach(async () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            Links  (
                shortCode   text primary key,
                originalUrl text,
                hasProtocol boolean
            )`;

    await db.query(queryText)
        .then((res) => {
            // console.log("Table creation success")
        })
        .catch((err) => {
            console.log(`Table creation error: ${err.stack}`);
        });
});

afterEach(async () => {
    const queryText = 
        `DROP TABLE IF EXISTS Links`;

    await db.query(queryText)
        .then((res) => {
            // console.log("Table Drop success")
        })
        .catch((err) => {
            console.log(`Table creation error: ${err.stack}`);
        });
})

afterAll(() => {
    db.end();
});

describe("POST /createShortUrl", () => {
    const url = "google.com";

    test("Success 201", async () => {
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
    });

    test("Invalid Url 500", async () => {
        const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: "nonsense"
            });

        expect(response.error.text).toBe("\"Invalid url given\"");
        expect(response.statusCode).toBe(500)
    });

    test("DB insert error 500", async () => {
        db.query('DROP TABLE Links', async (err, res) => {
            if(err) {
                throw new Error('Error dropping Links table from test db')
            }
            
            const response = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url
            });

            expect(response.statusCode).toBe(500);
            expect(response.error.text).toBe("\"Could not save url given\"");
        });
    });
});

describe("GET /goto/:shortcode", () => {
    test("Success 301 without http protocol", async () => {
        const url = "google.com";
        const postResponse = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url
            });
        
        expect(postResponse.statusCode).toBe(201);
        const shortCode = postResponse.body.shortCode;

        const getResponse = await request(app).get(`/goto/${shortCode}`);
        expect(getResponse.statusCode).toBe(301);
    });

    test("Success 301 with http protocol", async () => {
        const url = "https://www.google.com/";
        const postResponse = await request(app)
            .post("/createShortUrl")
            .send({
                originalUrl: url
            });
        
        expect(postResponse.statusCode).toBe(201);
        const shortCode = postResponse.body.shortCode;

        const getResponse = await request(app).get(`/goto/${shortCode}`);
        expect(getResponse.statusCode).toBe(301);
    });

    test("No Original URL Found 404", async () => {
        const response = await request(app).get('/goto/nonsense');
        expect(response.statusCode).toBe(404);
        expect(response.error.text).toBe("No URL associated with given short code");
    });

    test("No Original URL Found 404", async () => {
        db.query('DROP TABLE Links', async (err, res) => {
            if(err) {
                throw new Error('Error dropping Links table from test db')
            }
            
            const response = await request(app).get('/goto/nonsense');
            expect(response.statusCode).toBe(500);
            expect(response.error.text).toBe("\"Error retrieving original URL\"");
        });
    });
});
