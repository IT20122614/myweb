const request = require("supertest");

let server = require("../../index");

describe("Test the get methods", () => {
  afterEach( () => {
     server.close();
  });
  test("Test 1 - All Topics Get Method", async () => {
    const response = await request(server).get(
      "/api/topics/topics"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Test 2 - Get Specific Topic", async () => {
    const response = await request(server).get(
      "/api/topics/topic/627c11afc3a8562278ae9fe0"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Test 3 - Get All ResearchGroups", async () => {
    const response = await request(server).get(
      "/api/topics/researchgroups"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Test 4 - Get Specific Researchgroup", async () => {
    const response = await request(server).get("/api/topics/researchgroup/626c5f898e72bd34c7df51b2");
    expect(response.statusCode).toBe(200);
  });

  test("Test 5 - Get All Criterias", async () => {
    const response = await request(server).get(
      "/api/topics/criterias"
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the put methods", () => {
  afterEach(() => {
    server.close();
  });
  test("Test 1 - Update Specific Topic", async () => {
    const response = await request(server).put(
      "/api/topics/topic/update/627c11afc3a8562278ae9fe0"
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the post methods", () => {
  afterEach(() => {
    server.close();
  });
    test("Test 1 - Save All Marks", async () => {
      const response = await request(server).post(
        "/api/topics/criterias/save"
      );
      expect(response.statusCode).toBe(200);
    });
  });