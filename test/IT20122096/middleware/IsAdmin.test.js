const request = require("supertest");
const Group = require("../../../models/IT20122614/Group");

let server;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYzU2OGJhZjdlYWYzOGZkZDBlMWMiLCJ1c2VyUm9sZSI6IlN1cGVydmlzb3IiLCJlbWFpbCI6InN1cGVydmlzb3IxQGdtYWlsLmNvbSIsIm5hbWUiOiJMYWttaW5pIFdpamVzZWthcmEgIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MzY5MjAwNX0.oDopLJmI5M5GfeaPDy2eFqCyFFmamdzpgS3Kl3xNrPU";

describe("Authorization Middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
    await Group.deleteMany({});
  });
  
  it("should return 403 if user is not admin", async () => {
    const group = {
      groupid: "SE3030_GRP_71",
      supercisorid: "627fd64293fc1ca85ec445a1",
      cosupercisorid: "627fd64293fc1ca85ec445a2",
      panelmember: "",
    };
    const newGroup = new Group(group);
    await newGroup.save();
    id = newGroup._id;
    updateGroup = { panelmember: "627fd64293fc1ca85ec445a3" };

    const res = await request(server)
      .put(`/api/admin/groups/addPannelMember/${id}`)
      .send(updateGroup)
      .set("x-auth-token", token);

    expect(res.status).toBe(403);
  });
  
});
