const config = require("config");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../../../models/IT20122096/User");



describe("generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      userRole: "Student",
      userId: "1",
      email: "chamathkavvindya@gmail.com",
      name: "chamath",
    };

    const user = new User(payload);
    const token = user.generateAuthToken();
    const decode = jsonwebtoken.verify(token, config.get("jwtPrivateKey"));
    expect(decode).toMatchObject(payload);
  })
})