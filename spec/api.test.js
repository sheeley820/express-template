const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
let routerBuilder = require('../router')
let mongo = require('../mongo')
const request = require("supertest");
const mockData = require('./mock-data.json')
const bodyParser = require('body-parser')

process.env.DB_NAME = 'testDB'
process.env.TARGET_COLLECTION = 'testCollection'

describe('insert', () => {
  let connection;
  let db;

  app.use(
    bodyParser.urlencoded({extended: false}),
    bodyParser.json(),
    express.json()
)

  beforeAll(async () => {
      connection = await mongo.getClient(new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }));
      await routerBuilder.buildRouter(connection).then(resolvedRouter => {
        app.use("/", resolvedRouter)
        db = connection.db('test')
      })
  });

  beforeEach(async () => {
    await db.collection(process.env.TARGET_COLLECTION).deleteMany({});
    await db.collection(process.env.TARGET_COLLECTION).insertMany(mockData);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should get a message', async () => {
    const { body } = await request(app).get("/message");

    expect(body).toEqual({ "message": "Hello!" })
  });

  it('GET /test - success', async () => {
    const { body } = await request(app).get("/test?name=Fluffy");

    expect(body.result[0].name).toEqual("Fluffy")
    expect(body.result[0].breed).toEqual("siamese")
  });

  it('POST /test - success', () => {
    let body 
    request(app)
        .post("/test")
        .set('Content-Type', 'application/json')
        .send('{"name":"tj","pet":"tobi"}')
        .then((res) => {
          body = res
          expect(body.status).toEqual(200)
        })
        .catch(() => console.error)
  });

  it('should be able to make a post request', async () => {
    let body
    await request(app)
        .post('/postTest')
        .set('Content-Type', 'application/json')
        .send('{"message": "hi"}')
        .then((res) => {
            body = res
            
            // expect(res.body.message).toEqual('Thanks')
        })
        .catch((err) => console.error(err))
    expect(body.status).toEqual(200)
  })
});