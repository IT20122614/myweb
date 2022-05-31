const request = require("supertest");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../index")));
  afterEach(async () => {
    await server.close();
  });

  describe("POST/request/topic", () => {
    it("Should insert group members", async () => {
      const topics = {
        uId: "SE0046",
        userRole: "Student",
        groupid:"se3030_grp_30",
        field: "Cloud computing",
        topic: "Cloud computing Cloud computing Cloud computing",
        message: "Cloud computingCloud computingCloud computingCloud computing",
      };
      const res = await request(server)
        .post("/api/students/request/topic")
        .send(topics);
      expect(res.status).toBe(200);
    });
  });
  describe("POST/request/topic", () => {
    it("Should not insert topics", async () => {
      const topics = {
        uId: "SE0046",
        userRole: "Student",
        field: "Cloud computing",
        topic: "Cloud computing Cloud computing Cloud computing",
        message: "Cl",
      };
      await request(server)
        .post("/api/students/request/topic")
        .send(topics)
        .then((data) => {
          expect(data.status).toBe(400);
          done();
        })
        .catch((err) => {});
    });
  });
});
