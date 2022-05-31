const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR : JwtPrivateKey in not defined.");
  }
  if (!config.get("db")) {
    throw new Error("FATAL ERROR : db in not defined.");
  }
}
