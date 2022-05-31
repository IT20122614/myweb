const request  = require('supertest');
const Topic = require("../../../models/IT20122614/RegisterTopic");

let server;

describe("/api/topicRequests", () => {
  beforeEach(() => (server = require("../../../index")));
  afterEach(async () => {
    await server.close();
    await Topic.deleteMany({});
    jest.setTimeout(10000);
  });
  describe("GET/", () => {
    it("it should return all requests", async() => {
      const requests = [
        {
          groupid: "test",
          topic: "test",
          message: "test",
          file: "test",
          field: "test",
          status: "pending",
        },
        {
          groupid: "test2",
          topic: "test2",
          message: "test2",
          file: "test2",
          field: "test2",
          status: "pending",
        },
      ];

      await Topic.collection.insertMany(requests);

      const res = await request(server).get("/api/topicRequests");
    

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);

    });
    it("should return 400 if no requests found", async () => {
      const res = await request(server).get("/api/topicRequests");
      

      expect(res.status).toBe(400);
    })
  });
});
