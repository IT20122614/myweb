const request = require("supertest");
const Group = require("../../models/IT20122614/Group");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../index")));
  afterEach(async () => {
    await server.close();
    await Group.remove({});
  });

  describe("GET/cosupervisorsget", () => {
    it("should Add group", async () => {
      // const res = await RegisterTopic.collection.insertMany(topic);
      const res = await request(server).get("/api/students/cosupervisorsget");
      expect(res.status).toBe(200);
    });
  });

  describe("POST/add", () => {
    it("Should insert group", async () => {
      const groups = {
        groupid: "SE0046",
      };
      await request(server)
        .post("/api/students/add")
        .send(groups)
        .then(async (data) => {
          expect(data.status).toBe(200);
          done();
        })
        .catch((err) => {
          
        });
    });
  });
});
