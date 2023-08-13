const request = require("supertest");
//const app=require('../server')

const baseURL = "http://127.0.0.1:3006";

// /* student submission API test */
describe("task submission api test", () => {
  it("should return 200", async() => {
    const submissionData = {
      solution_zip:
        "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
      task_id: "HCI0033",
    };
    const response = await request(baseURL)
      .post("/updateTaskMap/solution")
      .send(submissionData);
    const msg = response.body.acknowledged;
    expect(response.statusCode).toBe(200);
    expect(msg).toBe(true);
    //done()
  });
});

describe("taskDetail Collection update on submisssion", () => {
  it("should return 200", async() => {
    const submissionData = {
      task_id: "HCI0033",
      student_comments: "code repository link from dropbox",
    };
    const response = await request(baseURL)
      .post("/updateTaskDetail/comments")
      .send(submissionData);
    const msg = response.body.acknowledged;
    expect(response.statusCode).toBe(200);
    expect(msg).toBe(true);
  });
});
