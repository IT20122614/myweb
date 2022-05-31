const request = require("supertest");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../index")));
  afterEach(async () => {
    await server.close();
    //await GroupMembers.remove({});
  });

  describe("POST/register/members", () => {
    it("Should insert group members", async () => {
      const groups = {
        groupid: "SE0046",
        userRole: "Student",
        userId: "IT20122614",
        name: "kavindu",
        email: "kavindu@gmail.com",
        isLeader: true,
      };
      await request(server)
        .post("/api/students/register/members")
        .send(groups)
        .then(async (data) => {
          expect(data.status).toBe(200);
          done();
        })
        .catch((err) => {
         
        });
    });
  });
  describe("POST/register/members", () => {
    it("Should insert group members", async () => {
      const groups = {
        groupid: "SE0046",
        userRole: "Student",
        userId: "IT20122614",
        name: "kavindu",
        email: "kavindu@gmail.com",
        isLeader: true,
      };
      await request(server)
        .post("/api/students/register/members")
        .send(groups)
        .then(async (data) => {
          expect(data.status).toBe(400);
          done();
        })
        .catch((err) => {
         
        });
    });
  });
  
});
