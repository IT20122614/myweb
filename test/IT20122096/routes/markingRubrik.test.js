const request = require("supertest");
const { MarkingRubrik } = require("../../../models/IT20122096/MarkingRubrik");

let server;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjcwY2JhZjdlYWYzOGZkZDBiOGEiLCJ1c2VyUm9sZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaGthIEpheWF0aGlsYWtlIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUzNjc4OTcxfQ.P5LOVZZDyUU2p1aO8M2YHwWCWY05IqHp1S1JGFp20es";

describe("/api/marking", () => {
  beforeEach(() => (server = require("../../../index")));
  afterEach(async () => {
    await server.close();
    await MarkingRubrik.deleteMany({});
  });
  describe("GET/", () => {
    it("should return 200 if all marking returned", async () => {
      const makings = [{ name: "Presentation" }, { name: "Presentation2" }];
      await MarkingRubrik.collection.insertMany(makings);
      const res = await request(server)
        .get("/api/marking")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it("should return 400 if markings are not found", async () => {
      const res = await request(server)
        .get("/api/marking")
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    });
  });
  describe("GET/:id", () => {
    it("should return 200 if making found for given id", async () => {
      const making = new MarkingRubrik({ name: "Presentation" });
      await making.save();

      const res = await request(server)
        .get(`/api/marking/${making._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    })
    it("should return 400 if making not found for given id", async () => {
      const id = "627fd64293fc1ca85ec445a1";

      const res = await request(server)
        .get(`/api/marking/${id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(400);
    });
  })
  describe("DELETE/:id", () => {
    it("should return 200 if marking deleted successfully", async () => {
      const making = new MarkingRubrik({ name: "Presentation" });
      await making.save();

      const res = await request(server)
        .delete(`/api/marking/${making._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    })
    it("should return 400 if making not found for given id", async () => {
      const id = "627fd64293fc1ca85ec445a1";

      const res = await request(server)
        .delete(`/api/marking/${id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(400);
    });
  })
  describe("POST/", () => {
    let marking;
    const exec =async() => {
      return await request(server)
        .post("/api/marking")
        .send(marking)
        .set("x-auth-token", token);
    }
    beforeEach(() => {
      marking = {
        name: "Presentation",
      };
    })
    it("should return 200 if marking saved success fully", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Presentation" );
    })
    it("should return 400 if no marking name passed", async () => {
      marking={}
      const res = await exec();

      expect(res.status).toBe(400);
    });
  })
});
