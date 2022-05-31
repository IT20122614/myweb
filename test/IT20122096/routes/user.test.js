const request = require("supertest");
const { User } = require("../../../models/IT20122096/user");

let server;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjcwY2JhZjdlYWYzOGZkZDBiOGEiLCJ1c2VyUm9sZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaGthIEpheWF0aGlsYWtlIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUzNjc4OTcxfQ.P5LOVZZDyUU2p1aO8M2YHwWCWY05IqHp1S1JGFp20es";

describe("/api/user", () => {
  beforeEach(() => (server = require("../../../index")));
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
    jest.setTimeout(10000);
  });

  describe("GET/", () => {
    it("should return all users", async () => {
      const users = [
        {
          userRole: "Student",
          userId: "IT20122096",
          // researchField: "",
          name: "Chamath",
          email: "chamath@gmail.com",
          password: "123456",
        },
        {
          userRole: "Supervisor",
          //userId: "IT20122096",
          researchField: "Cyber security ",
          name: "Chamath",
          email: "chamath2@gmail.com",
          password: "123456",
        },
      ];

      await User.collection.insertMany(users);

      const res = await request(server)
        .get("/api/user")
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
  describe("Get/:id", () => {
    it("should return user by given id", async () => {
      const data = {
        userRole: "Student",
        userId: "IT20122096",
        // researchField: "",
        name: "Chamath",
        email: "chamath@gmail.com",
        password: "123456",
      };
      const user = new User(data);
      await user.save();
      const res = await request(server)
        .get(`/api/user/${user._id}`)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", user.name);
    });
  });
  describe("POST/", () => {
    let user;

    const exec = async () => {
      return await request(server)
        .post("/api/user")
        .send(user)
        .set("x-auth-token", token);
    };

    beforeEach(() => {
      user = {
        userRole: "Student",
        userId: "IT20122096",
        // researchField: "",
        name: "Chamath",
        email: "chamath@gmail.com",
        password: "123456",
      };
    });

    it("should return 400 if user already registerd", async () => {
      const user1 = new User(user);
      await user1.save();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if invalid email", async () => {
      user = {
        userRole: "Student",
        userId: "IT20122096",
        // researchField: "",
        name: "Chamath",
        email: "chamat",
        password: "123456",
      };
      const user1 = new User(user);
      await user1.save();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 200 if user successfully registerd", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });
  describe("PUT/", () => {
    let user;
    let id;
    let newUser;

    const exec = async () => {
      return await request(server)
        .put(`/api/user/${id}`)
        .set("x-auth-token", token)
        .send(user);
    };

    beforeEach(() => {
      newUser = {
        userRole: "Student",
        researchField: "cyber security",
        name: "Chamath",
        email: "chamath@gmail.com",
        password: "123456",
      };
    });
    it("should retunr 200 if user found for given id", async () => {
      const user1 = new User(newUser);
      await user1.save();
      id = user1._id;
      user = {
        researchField: "cyber security",
        name: "Chamath",
        email: "chamath@gmail.com",
      };

      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should retunr 400 if user not found for given id", async () => {
      id = "627fd64293fc1ca85ec445a1";

      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
  describe("DELETE/", () => {
    let user;
    let id;

    const exec = async () => {
      return await request(server)
        .delete(`/api/user/${id}`)
        .send(user)
        .set("x-auth-token", token);
    };
    beforeEach(() => {
      user = {
        userRole: "Student",
        researchField: "cyber security",
        name: "Chamath",
        email: "chamath@gmail.com",
        password: "123456",
      };
    });
    it("should retunr 200 if user deleted", async () => {
      const user1 = new User(user);
      await user1.save();
      id = user1._id;

      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should retunr 400 if user not found for given id", async () => {
      id = "627fd64293fc1ca85ec445a1";

      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
