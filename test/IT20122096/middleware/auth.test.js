const  request  = require("supertest");
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/IT20122096/User");
const Group = require("../../../models/IT20122614/Group");
const { after } = require("lodash");

let server;
describe("Authorization Middleware", () => {
  beforeEach(() => {
    server=require("../../../index")
  });
  afterEach(async() => {
    await server.close();
    await Group.deleteMany({});
  });
  it("should give user with the payload of a valid token", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      userRole: "Student",
      userId: "1",
      email: "chamathkavvindya@gmail.com",
      name: "chamath",
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
  it("should return 401 if no token provided", async() => {
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

    const res = await request(server).put(`/api/admin/groups/addPannelMember/${id}`).send(updateGroup);
    
    expect(res.status).toBe(401);
  });
  it("should return 400 if invalid token provided", async () => {
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
      .set("x-auth-token", "abc");

    expect(res.status).toBe(400);
  });
});
