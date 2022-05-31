const request = require("supertest");
const Group = require("../../models/IT20122614/Group");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../index")));
  afterEach(async () => {
    await server.close();
    await Group.remove({});
  });

  describe("GET/supervisorsget", () => {
    it("should Add group", async () => {
      // const res = await RegisterTopic.collection.insertMany(topic);
      const res = await request(server).get("/api/students/supervisorsget");
      expect(res.status).toBe(200);
    });
  });
});
