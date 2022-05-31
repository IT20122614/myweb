const request = require("supertest");
const Group = require("../../models/IT20122614/Group");

let server;

describe("/api/students", () => {
    beforeEach(() => (server = require("../../index")));
    afterEach(async () => {
      await server.close();
      await Group.remove({});
    });

    // display All groups
  
    describe("GET/groupget", () => {
      it("should return all Groups", async () => {
        const group = [
          {
            groupid: "SE3030_GRP_96",
            supercisorid: "IT20122614",
            cosupercisorid: "Kavindu",
            panelmember: "kavindu1234@gmail.com",
            report: "123456",
            presentation: "IT20122618",
            proposal: "Madushan",
            Finalthesis: "madushan1234@gmail.com",
            isOngoing: true,
            isMarked: false,
          },
          {
            groupid: "SE3030_GRP_98",
            supercisorid: "IT20122618",
            cosupercisorid: "Madushan",
            panelmember: "madushan1234@gmail.com",
            report: "123456",
            presentation: "IT20122618",
            proposal: "Madushan",
            Finalthesis: "madushan1234@gmail.com",
            isOngoing: true,
            isMarked: false,
          },
        ];
  
        await Group.collection.insertMany(group);
        const res = await request(server).get("/api/students/groupget");
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
      });
    });

    // display all group members

    describe("GET/groupmembersget", () =>{
        it("should return all group members", async () =>{
            const res = await request(server).get("/api/students/groupmembersget");
            expect(res.status).toBe(200);
        })
    })


  });
