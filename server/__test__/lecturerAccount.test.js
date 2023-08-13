const request = require("supertest");
//const app=require('../server')

const baseURL = "http://127.0.0.1:3006";

/* Fetch student taskMap for tasks that have publisher or assigner ID equal to current professor's userId */
describe("get student TaskMap data for all published task", () => {
  it("should return 200", async() => {
    const taskId_List = ["HCI0001", "HCI0033"];
    const response = await request(baseURL)
      .post("/lecturer/getStudentTaskMap")
      .send({ taskId_List: taskId_List });
    const taskMapData = response.body.taskMapData;
    expect(response.statusCode).toBe(200);
    expect(taskMapData.length > 0).toBe(true);
    //done()
  });
});

/* Test the evaluation action for completed tasks */
describe("check task Score update", () => {
  it("should return 200", async() => {
    const taskData = {
      comments: {
        publisher:
          "Consider using a combination of frontend and backend technologies such as React, Node.js, and MongoDB to build the app. Integration with popular payment gateways like Stripe can be beneficial for ticketing functionality.",
        assigner: "",
        student: "",
      },
      _id: "64d7c7f89c1a6b7f3a0b926a",
      key: "HCI0005",
      publisher_id: "2117280001",
      assigner_id: "",
      title: "Event Planning App",
      summary:
        "Create an event planning application that allows users to create and manage events. The app should include features such as event registration, ticketing, and event notifications. Design an intuitive and visually appealing interface for event organizers and attendees.",
      pdf_file: "",
      start_date: "2023/06/12",
      end_date: "2023/07/03",
      task_type: "ASSIGNMENT",
      active: false,
      assesment_criteria: [],
      subTaskInfo: [],
      __v: 0,
      studentTaskMap: [
        {
          _id: "64d7c7f89c1a6b7f3a0b926a",
          user_id: "2117280000",
          task_id: "HCI0005",
          score: [
            {
              name: "accuracy",
              weightage: 0,
              _id: "64d7c7f89c1a6b7f3a0b926b",
            },
            {
              name: "basic functionality",
              weightage: 0,
              _id: "64d7c7f89c1a6b7f3a0b926c",
            },
            {
              name: "code quality",
              weightage: 0,
              _id: "64d7c7f89c1a6b7f3a0b926d",
            },
            {
              name: "documentation",
              weightage: 0,
              _id: "64d7c7f89c1a6b7f3a0b926e",
            },
          ],
          solution_zip:
            "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
          totalScore: 0,
          subtask_id: [],
          __v: 0,
        },
      ],
      user_id: "2117280000",
      task_id: "HCI0005",
      score: [
        { name: "accuracy", weightage: 5, _id: "64d7c7f89c1a6b7f3a0b926b" },
        {
          name: "basic functionality",
          weightage: 5,
          _id: "64d7c7f89c1a6b7f3a0b926c",
        },
        {
          name: "code quality",
          weightage: 5,
          _id: "64d7c7f89c1a6b7f3a0b926d",
        },
        {
          name: "documentation",
          weightage: 5,
          _id: "64d7c7f89c1a6b7f3a0b926e",
        },
      ],
      solution_zip:
        "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
      totalScore: 20,
      subtask_id: [],
    };
    const response = await request(baseURL)
      .post("/lecturer/updateTaskMap/score")
      .send({ taskData: taskData });
    console.log("Check response body", response.body);
    const msg = await response.body.acknowledged;
    expect(response.statusCode).toBe(200);
    expect(msg).toBe(true);
  });
});

/* Test Assign Action for projects */
describe("check assign project subtask action", () => {
  it("should return 200", async() => {
    const taskMapData = [
      {
        user_id: "2117280000",
        score: [],
        totalScore: 0,
        solution_zip: "",
        task_id: "HCI0026",
        subtask_id: ["HCI0026_01"],
      },
      {
        user_id: "2117280009",
        score: [],
        totalScore: 0,
        solution_zip: "",
        task_id: "HCI0026",
        subtask_id: ["HCI0026_02"],
      },
      {
        user_id: "2117280008",
        score: [],
        totalScore: 0,
        solution_zip: "",
        task_id: "HCI0026",
        subtask_id: ["HCI0026_03"],
      },
    ];
    const response = await request(baseURL)
      .post("/lecturer/setTaskMap")
      .send(taskMapData);
    const taskMapList = response.body;
    expect(response.statusCode).toBe(200);
    expect(taskMapList.length).toBe(taskMapData.length);
  });

  it("should update taskDetail collection in DB", async() => {
    const task_id_list = ["HCI0026", "HCI0026", "HCI0026"];
    const response = await request(baseURL)
      .post("/lecturer/updateTaskDetail")
      .send(task_id_list);
    const msg = response.body.acknowledged;
    expect(response.statusCode).toBe(200);
    expect(msg).toBe(true);
  });
});

/* Publish Assignment Test */
describe("on publish new assignment update TaskDetail Collection", () => {
  it("publish action should update the TaskDetail collection", async() => {
    const taskData = {
      key: "HCI0074",
      publisher_id: "2117280001",
      assigner_id: "",
      title: "Real-time Chat Application",
      summary:
        "Create a chat application with chat post edit and update feature",
      comments: {
        publisher: "Refer react js chat application from free code camp",
        assigner: "",
        student: "",
      },
      pdf_file: "",
      start_date: "2023/08/23",
      end_date: "2023/09/28",
      task_type: "ASSIGNMENT",
      active: false,
      assesment_criteria: [
        "accuracy",
        "code quality",
        "documentation",
        "basic functionality",
      ],
    };
    const response = await request(baseURL)
      .post("/lecturer/addNewTask/assignment")
      .send({
        taskDetail: taskData,
      });
    const task_id = response.body[0].key;
    expect(response.statusCode).toBe(200);
    expect(task_id).toBe(taskData.key);
  });
});
