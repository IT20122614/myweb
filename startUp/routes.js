const cors = require("cors");
//IT20122096
const bodyParser = require("body-parser");
const user = require("../routes/IT20122096/user");
const login = require("../routes/IT20122096/login");
const criteria = require("../routes/IT20122096/criteria");
const markingRubrik = require("../routes/IT20122096/markingRubrik");
const adminProfile = require("../routes/IT20122096/adminProfile");
const pannelMemReqs = require("../routes/IT20122096/pannelMemReqs");
const template = require("../routes/IT20122096/template");
const submision = require("../routes/IT20122096/submision");
//IT20216078
const staff = require("../routes/IT20216078/staff");
const chat = require("../routes/IT20216078/chat");
//IT20192082
const topicRoutes = require("../routes/IT20192082/topics");
//IT20122614
const StudentRouter = require("../routes/IT20122614/StudentRoute");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  //IT20122096
  app.use("/api/user", user);
  app.use("/api/login", login);
  app.use("/api/criteria", criteria);
  app.use("/api/marking", markingRubrik);
  app.use("/api/admin/groups", adminProfile);
  app.use("/api/topicRequests", pannelMemReqs);
  app.use("/api/template", template);
  app.use("/api/submision", submision);
  //IT20216078
  app.use("/api/staff", staff);
  app.use("/api/chat", chat);
  //IT20192082
  app.use("/api/topics", topicRoutes);
  //IT20122614
  app.use("/api/students", StudentRouter);
};
