const request = require("supertest");
const { Template } = require("../../../models/IT20122096/Templates");

let server;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjcwY2JhZjdlYWYzOGZkZDBiOGEiLCJ1c2VyUm9sZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaGthIEpheWF0aGlsYWtlIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUzNjc4OTcxfQ.P5LOVZZDyUU2p1aO8M2YHwWCWY05IqHp1S1JGFp20es";

describe("/api/template", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
    await Template.deleteMany({});
    jest.setTimeout(10000);
  });

  describe("GET/", () => {
    it("should return all templates", async () => {
      const templates = [
        {
          type: "Presentaion",
          file: "http://presentaion.pptx",
        },
        {
          type: "Presentaion2",
          file: "http://presentaion2.pptx",
        },
      ];
      await Template.collection.insertMany(templates);
      const res = await request(server)
        .get("/api/template")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it("should return 400 if no templates found", async () => {
      const res = await request(server)
        .get("/api/template")
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    });
  });
  describe('DELETE', () => { 
    it("should return 200 if template deleted successfully", async () => {
      const template = {
        type: "Presentaion",
        file: "http://presentaion.pptx",
      };
      const newTemplate = new Template(template);
      await newTemplate.save();

      const res = await request(server)
        .delete(`/api/template/${newTemplate._id}`)
        .set("x-auth-token", token);

      expect(res.status).toBe(200);

    })
    it("should return 400 if no template found for given id", async () => {

      const id = "627fd64293fc1ca85ec445a1";

      const res = await request(server)
        .delete(`/api/template/${id}`)
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    })

   })
});
