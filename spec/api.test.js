const {MongoClient} = require('mongodb');
const express = require("express");
const app = express();
let routerBuilder = require('../router')
let mongo = require('../mongo')
const request = require("supertest");
const mockData = require('./mock-data.json')

process.env.DB_NAME = 'test'
process.env.KITTEN_COLLECTION = 'test'

describe('insert', () => {
  let connection;
  let db;

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
    await db.collection('test').deleteMany({});
    await db.collection('test').insertMany(mockData);
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
          console.log("Hahahaha")})
        .catch(() => console.error)

    // db.collection(KITTEN_COLLECTION)
    //   .findOne({ "name": "tj" })
    //   .toArray()
    //   .then(doc => {
    //     expect(doc.name).toEqual("tj")
    //   })
  });
});