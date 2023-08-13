const request = require("supertest");
//const app=require('../server')

const baseURL = "http://127.0.0.1:3006";

/* Test Get_Student_Info API to get info about students working on projects published by current mentor */
describe("should render student taskMap data for all tasks published by the mentor", () => {
  it("check GET studentTaskMap API", async() => {
    const taskIdList = [
      "HCI0035",
      "HCI0036",
      "HCI0014",
      "HCI0016",
      "HCI0018",
      "HCI0038",
      "HCI0023",
      "HCI0020",
    ];
    const response = await request(baseURL)
      .post("/mentor/getStudentInfo")
      .send(taskIdList);
    const taskMapList=response.body.taskMapList;
    expect(response.statusCode).toBe(200);
    expect(taskMapList.every(task=>task.user_id)).toBe(true);
  });
});
