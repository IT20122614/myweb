const request = require("supertest");
const auth = require("../../../middleware/auth");
const Group = require("../../../models/IT20122614/Group");
const GroupMembers = require("../../../models/IT20122614/GroupMember");

let server;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjcwY2JhZjdlYWYzOGZkZDBiOGEiLCJ1c2VyUm9sZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaGthIEpheWF0aGlsYWtlIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUzNjc4OTcxfQ.P5LOVZZDyUU2p1aO8M2YHwWCWY05IqHp1S1JGFp20es";

describe("/api/admin/groups", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
    await Group.deleteMany({});
    await GroupMembers.deleteMany({});
  });
  describe("GET/", () => {
    it("should return 200 if all the groups are returned", async () => {
      const groups = [
        {
          groupid: "SE3030_GRP_71",
          supercisorid: "627fd64293fc1ca85ec445a1",
          cosupercisorid: "627fd64293fc1ca85ec445a2",
        },
        {
          groupid: "SE3030_GRP_72",
          supercisorid: "627fd64293fc1ca85ec445a1",
          cosupercisorid: "627fd64293fc1ca85ec445a2",
        },
      ];

      await Group.collection.insertMany(groups);
      const res = await request(server)
        .get("/api/admin/groups")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it("should return 400 if groups not found", async () => {
      const res = await request(server)
        .get("/api/admin/groups")
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    });
    it("should return 200 if all the groupmembers are returned", async () => {
      const members = [
        {
          groupid: "SE3030_GRP_71",
          userRole: "Student",
          userId: "IT20122614",
          name: "kavindu",
          email: "kavindu@gmail.com",
          isLeader: true,
        },
        {
          groupid: "SE3030_GRP_71",
          userRole: "Student",
          userId: "IT20122614",
          name: "kavindu",
          email: "kavindu@gmail.com",
          isLeader: true,
        },
      ];
      await GroupMembers.collection.insertMany(members);
      const res = await request(server)
        .get("/api/admin/groups/groupMembers")
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
    it("should return 400 if members not found", async () => {
      const res = await request(server)
        .get("/api/admin/groups/groupMembers")
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    });
  });
  describe("GET/:id", () => {
    it("should return 200 if  group found for given id", async () => {
      const member = {
        groupid: "SE3030_GRP_71",
        userRole: "Student",
        userId: "IT20122614",
        name: "kavindu",
        email: "kavindu@gmail.com",
        isLeader: true,
      };

      const newMember = new GroupMembers(member);
      await newMember.save();
      const res = await request(server)
        .get(`/api/admin/groups/getGroupMemberById/${newMember._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
    it("should return 400 if members not found", async () => {
      const id = "627fd64293fc1ca85ec445a1";
      const res = await request(server)
        .get(`/api/admin/groups/getGroupMemberById/${id}`)
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
    });
  });
  describe("PUT/addPannelMember/:id", () => {
    let group;
    let updateGroup;
    let id;
    const exec = async () => {
      return await request(server)
        .put(`/api/admin/groups/addPannelMember/${id}`)
        .set("x-auth-token", token)
        .send(updateGroup);
    };
    beforeEach(() => {
      group = {
        groupid: "SE3030_GRP_71",
        supercisorid: "627fd64293fc1ca85ec445a1",
        cosupercisorid: "627fd64293fc1ca85ec445a2",
        panelmember: "",
      };
    });
    it("should return 200 if group updated successfully", async () => {
      const newGroup = new Group(group);
      await newGroup.save();
      id = newGroup._id;
      updateGroup = { panelmember: "627fd64293fc1ca85ec445a3" };

      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "panelmember",
        "627fd64293fc1ca85ec445a3"
      );
    });
    it("should return 400 if no group found for given id", async () => {
      id = "627fd64293fc1ca85ec445a3";
      updateGroup = { panelmember: "627fd64293fc1ca85ec445a4" };

      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
  describe("PUT/getGroupMemberById/:id", () => {
    let member;
    let updateMember;
    let id;
    const exec = async () => {
      return await request(server)
        .put(`/api/admin/groups/UpdateGroupMembers/${id}`)
        .set("x-auth-token", token)
        .send(updateMember);
    };
    beforeEach(() => {
      member = {
        groupid: "SE3030_GRP_71",
        userRole: "Student",
        userId: "IT20122614",
        name: "kavindu",
        email: "kavindu@gmail.com",
        isLeader: true,
      };
    });
    it("should return 200 if member updated successfully", async () => {
      const newMember = new GroupMembers(member);
      await newMember.save();
      id = newMember._id;
      updateMember = {
        groupid: "SE3030_GRP_71",
        userId: "IT20122614",
        name: "Chamath",
        email: "kavindu@gmail.com",
      };

      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Chamath");
    });
    it("should return 400 if no member found for given id", async () => {
      id = "627fd64293fc1ca85ec445a3";
      updateGroup = {
        groupid: "SE3030_GRP_71",
        userId: "IT20122614",
        name: "Chamath",
        email: "kavindu@gmail.com",
      };

      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
  describe("DELETE/:id", () => {
    it("should return 200 if successfully deleted", async () => {
      const member = {
        groupid: "SE3030_GRP_71",
        userRole: "Student",
        userId: "IT20122614",
        name: "kavindu",
        email: "kavindu@gmail.com",
        isLeader: true,
      };
      const newMember = new GroupMembers(member);
      await newMember.save();
      const res = await request(server)
        .delete(`/api/admin/groups/DeleteGroupMember/${newMember._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
    it("should return 400 if no member found for given id", async () => {
      id = "627fd64293fc1ca85ec445a3";
      const res = await request(server)
        .delete(`/api/admin/groups/DeleteGroupMember/${id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(400);
    });
  });
});
