const express = require("express");

const researchRecordRoutes = express.Router();

const dbo = require("../../startUp/dbcon");
dbo.connectToServer("research_management", function (err) {
  if (err) console.log(err);
});

const ObjectId = require("mongodb").ObjectId;

// Return all accepted research topics by staff id
researchRecordRoutes.route("/topics/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("request_toics")
    .find({ uId: req.params.id, status: "accepted" })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

// Return all requested research topics by staff id
researchRecordRoutes.route("/requests/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("request_toics")
    .find({ uId: req.params.id, status: "pending" })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

// Accept a topic request using topic request object identification
researchRecordRoutes.route("/requests/accept/:id").put(function (req, res) {
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      status: "accepted",
    },
  };
  let db_connect = dbo.getDb();

  db_connect
    .collection("request_toics")
    .findOne(myquery, async function (err0, result0) {
      if (err0) {
        console.log(err0);
      }

      const collections = (
        await db_connect.listCollections({}, { nameOnly: true }).toArray()
      ).map(({ name }) => name);
      if (!collections.includes(result0.groupid)) {
        db_connect.createCollection(result0.groupid, function (err1, result1) {
          if (err1) {
            console.log(err1);
          }
        });
      }

      db_connect
        .collection("users")
        .findOne({ _id: ObjectId(result0.uId) }, function (err, result2) {
          if (err) {
            console.log(err);
          }

          let myobj = {
            groupid: result0.groupid,
          };

          if (result2.userRole === "Supervisor") {
            let obj = {
              $set: {
                supercisorid: result0.uId,
              },
            };
            db_connect
              .collection("researchgroups")
              .updateOne(myobj, obj, function (err, result1) {
                if (err) {
                  console.log(err);
                }
              });
          } else {
            let obj = {
              $set: {
                cosupercisorid: result0.uId,
              },
            };
            db_connect
              .collection("researchgroups")
              .updateOne(myobj, obj, function (err, result1) {
                if (err) {
                  console.log(err);
                }
              });
          }
        });
    });

  db_connect
    .collection("request_toics")
    .updateOne(myquery, newvalues, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.sendStatus(200);
    });
});

// Decline a topic request using topic request object identification
researchRecordRoutes.route("/requests/decline/:id").put(function (req, res) {
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      status: "rejected",
    },
  };
  let db_connect = dbo.getDb();
  db_connect
    .collection("request_toics")
    .updateOne(myquery, newvalues, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.sendStatus(200);
    });
});

researchRecordRoutes.route("/submissions/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("researchgroups")
    .findOne({ groupid: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

// Return all the marking rubricks
researchRecordRoutes.route("/markings").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("markingrubriks")
    .find()
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

// Return all the criterias relating to a specific marking rubrick
researchRecordRoutes.route("/markings/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("criterias")
    .find({ markingRubrikId: req.params.id })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

// Save marks of a specific marking rubrick relating to a group
researchRecordRoutes.route("/insertmarks/:id").post(function (req, res) {
  let isMarked = false;
  let db_connect = dbo.getDb();
  let markingRubrickName = req.body.name.toLowerCase();
  let myobj = {
    groupid: req.params.id,
    name: markingRubrickName,
    mark: req.body.mark,
  };
  db_connect
    .collection("marks")
    .find({ groupid: req.params.id })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      for (let index = 0; index < result.length; index++) {
        if (result[index].name === myobj.name) {
          isMarked = true;
          break;
        }
      }
      if (isMarked === false) {
        db_connect.collection("marks").insertOne(myobj, function (err, result) {
          if (err) {
            console.log(err);
          }
        });

        let myquery = { groupid: req.params.id };
        let newvalues = {
          $set: {
            isMarked: true,
          },
        };
        db_connect
          .collection("researchgroups")
          .updateOne(myquery, newvalues, function (err, result) {
            if (err) {
              console.log(err);
            }
          });
      }

      if (isMarked === false) {
        res.sendStatus(200);
      } else {
        res.send({
          msg: false,
        });
      }
    });
});

module.exports = researchRecordRoutes;
