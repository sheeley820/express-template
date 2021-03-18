const {MongoClient} = require('mongodb');
const express = require("express");
const app = express();
let routerBuilder = require('../router')
let mongo = require('../mongo')
const request = require("supertest");
const mockData = require('./mock-data.json')
process.env.KITTEN_COLLECTION = 'test'

describe('insert', () => {
  let connection;
  let db;
  let router;

  beforeAll(async () => {
      connection = await mongo.getClient(new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }));
      await routerBuilder.buildRouter(connection, "test").then(resolvedRouter => {
        router = resolvedRouter
        app.use("/", router)
      })
  });

  beforeEach(async () => {
    db = connection.db('test')
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

  it('should get a kitten', async () => {
    const { body } = await request(app).get("/test?name=Fluffy");

    expect(body.result[0].name).toEqual("Fluffy")
    expect(body.result[0].breed).toEqual("siamese")
  });
});