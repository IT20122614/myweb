const express = require("express");

const researchRecordRoutes = express.Router();

const dbo = require("../../startUp/dbcon");
dbo.connectToServer("research_management", function (err) {
  if (err) console.log(err);
});

const ObjectId = require("mongodb").ObjectId;

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1403424",
  key: "2cad138fbc7c142d3cfd",
  secret: "17e759d678d73053a48b",
  cluster: "ap2",
  useTLS: true,
});

// Send a message to a specific research group
researchRecordRoutes.route("/:id").post(function (req, res) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("users")
    .findOne({ _id: ObjectId(req.body.SendBy) }, function (err, result0) {
      if (err) {
        console.log(err);
      }

      let obj = {
        Message: req.body.Message,
        SendBy: req.body.SendBy,
        name: result0.name,
      };

      db_connect
        .collection(req.params.id)
        .insertOne(obj, function (err, result1) {
          if (err) {
            console.log(err);
          }
        });

      pusher.trigger(req.params.id, "new_message", obj);
    });
});

// // Get all messages relating to a specific research group
researchRecordRoutes.route("/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection(req.params.id)
    .find()
    .sort({ _id: 1 })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

module.exports = researchRecordRoutes;
