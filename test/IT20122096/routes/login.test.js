const { User } = require("../../../models/IT20122096/User");
const request = require("supertest");
const bcrypt = require("bcrypt");
let server;

describe("/api/login", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });
  describe("POST/", () => {
    let user;
    let loginData;

    const exec = async () => {
      return await request(server).post("/api/login").send(loginData);
    };
    beforeEach(async() => {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const password = await bcrypt.hash("123456", salt);

      user = {
        userRole: "Student",
        userId: "IT20122096",
        email: "chamathkavvindya@gmail.com",
        name: "chamath",
        password: password,
      };
    });
    it("should return 400 if given email dosn't exist", async () => {
      const newUSer = new User(user);
      await newUSer.save();

      loginData = {
        email: "chamathkavvindya2@gmail.com",
        password: "123456",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if given password is wrong", async () => {
      const newUSer = new User(user);
      await newUSer.save();

      loginData = {
        email: "chamathkavvindya@gmail.com",
        password: "1234567",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 200 if given data is correct", async () => {
      const newUSer = new User(user);
      await newUSer.save();

      loginData = {
        email: "chamathkavvindya@gmail.com",
        password: "123456",
      };
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
