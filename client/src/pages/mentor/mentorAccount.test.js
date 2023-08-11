import { getByRole, getByText, render, screen } from "@testing-library/react";
import { renderWithProviders } from "mockProviderRedux/test-utils";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import MentorDashboard from "./dashboard";

import TaskList from "./taskList/taskList";
import TaskListMainPage from "./taskList";
import TaskDetail from "pages/student/taskDetail";
//import { ACCOUNT_TYPES } from "constants";

/* To mock constant.js file content */
jest.mock("constants", () => ({
  ACCOUNT_TYPES: {
    STUDENT: "student",
    LECTURER: "lecturer",
    MENTOR: "mentor",
  },
  TASK_TYPES: {
    PROJECT: "PROJECT",
    ASSIGNMENT: "ASSIGNMENT",
  },
}));

//const mockedUsedNavigate = jest.fn();
/* To Mock URL Params */
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    project_type: "ACTIVE",
  }),
  useRouteMatch: () => ({ url: "/mentor/project/ACTIVE" }),
}));

describe("test all mentor account functionality", () => {
  /* Test if the recently submitted project list is rendered correctly*/
  it("renders recent submission list based on submitted_list count from redux store", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280002",
      userData: {
        first_name: "Jane",
        last_name: "Smith",
        role: "mentor",
      },
      error: "",
      account_type: "mentor",
    };
    const mentorTaskInfo = {
      active_list: [],
      submitted_list: [
        {
          comments: {
            publisher:
              "Consider popular social media platforms like Facebook, Twitter, or Instagram as inspiration for designing and implementing your social media app. Pay attention to user privacy and security while implementing features like user authentication and data protection. Create an engaging and user-friendly interface to attract and retain users.",
            assigner: "",
            student: "",
          },
          _id: "64d2926d12f6a8ce7f628d4c",
          key: "HCI0023",
          publisher_id: "2117280002",
          assigner_id: "2117280001",
          title: "Social Media App",
          summary:
            "Create a social media application that allows users to connect, share content, and interact with each other. The app should include features like creating user profiles, posting updates, following other users, commenting on posts, and direct messaging. Implement a responsive design and ensure the app provides a seamless experience for users to connect and engage with the community.",
          pdf_file: "",
          start_date: "2023/07/15",
          end_date: "2023/08/01",
          task_type: "PROJECT",
          subTaskInfo: [],
          active: false,
          assesment_criteria: [
            "accuracy",
            "basic functionality",
            "code quality",
            "documentation",
          ],
          __v: 0,
          studentTaskMap: [
            {
              _id: "64d2926d12f6a8ce7f628d13",
              user_id: "2117280011",
              task_id: "HCI0023",
              score: [],
              solution_zip:
                "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
              totalScore: 22,
              subtask_id: ["HCI0023_02", "HCI0023_03"],
              __v: 0,
            },
          ],
        },
      ],
      pending_list: [],
    };
    renderWithProviders(
      <BrowserRouter>
        <MentorDashboard />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          mentorTaskInfo: mentorTaskInfo,
        },
      }
    );
    const list = await screen.findAllByTestId("submitted-project-list-item");
    await expect(list.length).toEqual(1);
  });

  /* Validate active project count for dashboard  */
  it("validate active project count for mentor", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280002",
      userData: {
        first_name: "Jane",
        last_name: "Smith",
        role: "mentor",
      },
      error: "",
      account_type: "mentor",
    };
    const mentorTaskInfo = {
      active_list: [
        {
          key: "HCI0035",
          publisher_id: "2117280002",
          assigner_id: "2117280001",
          title: "Fitness Tracking App",
          summary:
            "Design and develop a fitness tracking application that helps users monitor their exercise and wellness activities. The app should include features like tracking workouts, counting steps, recording heart rate, and providing personalized recommendations based on user goals. Ensure the app has an intuitive and visually appealing interface to motivate users in achieving their fitness targets.",
          pdf_file: "",
          start_date: "2023/07/20",
          end_date: "2023/08/10",
          task_type: "PROJECT",
          subTaskInfo: [
            {
              task_label: "User profile and goal setting",
              task_detail: "Implement user goal setting functionality",
              task_id: "HCI0035_01",
            },
          ],
          active: true,
          assesment_criteria: [],
          __v: 0,
          studentTaskMap: [
            {
              _id: "64d2926d12f6a8ce7f628d22",
              user_id: "2117280009",
              task_id: "HCI0035",
              score: [],
              solution_zip: "",
              totalScore: 0,
              subtask_id: ["HCI0035_02", "HCI0035_03"],
              __v: 0,
            },
          ],
        },
      ],
      submitted_list: [],
      pending_list: [],
    };

    renderWithProviders(
      <BrowserRouter>
        <MentorDashboard />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          mentorTaskInfo: mentorTaskInfo,
        },
      }
    );
    const activeProjectCount = await screen.findByRole("heading", {
      "data-testid": "mentor-ACTIVE",
      name: 1,
    });
    await expect(activeProjectCount).toBeInTheDocument();
  });

  /* Validate submitted project count for dashboard  */
  it("validate submitted project count for mentor", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280002",
      userData: {
        first_name: "Jane",
        last_name: "Smith",
        role: "mentor",
      },
      error: "",
      account_type: "mentor",
    };
    const mentorTaskInfo = {
      active_list: [],
      submitted_list: [
        {
          comments: {
            publisher:
              "Consider popular social media platforms like Facebook, Twitter, or Instagram as inspiration for designing and implementing your social media app. Pay attention to user privacy and security while implementing features like user authentication and data protection. Create an engaging and user-friendly interface to attract and retain users.",
            assigner: "",
            student: "",
          },
          _id: "64d2926d12f6a8ce7f628d4c",
          key: "HCI0023",
          publisher_id: "2117280002",
          assigner_id: "2117280001",
          title: "Social Media App",
          summary:
            "Create a social media application that allows users to connect, share content, and interact with each other. The app should include features like creating user profiles, posting updates, following other users, commenting on posts, and direct messaging. Implement a responsive design and ensure the app provides a seamless experience for users to connect and engage with the community.",
          pdf_file: "",
          start_date: "2023/07/15",
          end_date: "2023/08/01",
          task_type: "PROJECT",
          subTaskInfo: [
            {
              task_label: "User profile ",
              task_detail: "Implement user personal details edit page",
              task_repo: "",
              task_id: "HCI0023_01",
              _id: "64d2926d12f6a8ce7f628d4d",
            },
            {
              task_label: "Post Creation",
              task_detail:
                "Enable users to publish post and add images and videos to it",
              task_repo: "",
              task_id: "HCI0023_02",
              _id: "64d2926d12f6a8ce7f628d4e",
            },
            {
              task_label: "Notifications and reminders",
              task_detail: "Implement real-time notifications for new messages",
              task_repo: "",
              task_id: "HCI0023_03",
              _id: "64d2926d12f6a8ce7f628d4f",
            },
          ],
          active: false,
          assesment_criteria: [
            "accuracy",
            "basic functionality",
            "code quality",
            "documentation",
          ],
          __v: 0,
          studentTaskMap: [
            {
              _id: "64d2926d12f6a8ce7f628d13",
              user_id: "2117280011",
              task_id: "HCI0023",
              score: [
                {
                  name: "accuracy",
                  weightage: 7,
                  _id: "64d2926d12f6a8ce7f628d14",
                },
                {
                  name: "basic functionality",
                  weightage: 9,
                  _id: "64d2926d12f6a8ce7f628d15",
                },
                {
                  name: "code quality",
                  weightage: 4,
                  _id: "64d2926d12f6a8ce7f628d16",
                },
                {
                  name: "documentation",
                  weightage: 2,
                  _id: "64d2926d12f6a8ce7f628d17",
                },
              ],
              solution_zip:
                "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
              totalScore: 22,
              subtask_id: ["HCI0023_02", "HCI0023_03"],
              __v: 0,
            },
            {
              _id: "64d2926d12f6a8ce7f628d18",
              user_id: "2117280009",
              task_id: "HCI0023",
              score: [
                {
                  name: "accuracy",
                  weightage: 5,
                  _id: "64d2926d12f6a8ce7f628d19",
                },
                {
                  name: "basic functionality",
                  weightage: 10,
                  _id: "64d2926d12f6a8ce7f628d1a",
                },
                {
                  name: "code quality",
                  weightage: 6,
                  _id: "64d2926d12f6a8ce7f628d1b",
                },
                {
                  name: "documentation",
                  weightage: 5,
                  _id: "64d2926d12f6a8ce7f628d1c",
                },
              ],
              solution_zip:
                "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
              totalScore: 26,
              subtask_id: ["HCI0023_01"],
              __v: 0,
            },
          ],
        },
      ],
      pending_list: [],
    };

    renderWithProviders(
      <BrowserRouter>
        <MentorDashboard />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          mentorTaskInfo: mentorTaskInfo,
        },
      }
    );
    const submittedProjectCount = await screen.findByRole("heading", {
      "data-testid": "mentor-SUBMITTED",
      name: 1,
    });
    await expect(submittedProjectCount).toBeInTheDocument();
  });

  /* TRACK PROGESS button validation */
  it("check 'track progress' button visibility for active projects", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280002",
      userData: {
        first_name: "Jane",
        last_name: "Smith",
        role: "mentor",
      },
      error: "",
      account_type: "mentor",
    };
    const mentorTaskInfo = {
      active_list: [
        {
          key: "HCI0035",
          publisher_id: "2117280002",
          assigner_id: "2117280001",
          title: "Fitness Tracking App",
          summary:
            "Design and develop a fitness tracking application that helps users monitor their exercise and wellness activities. The app should include features like tracking workouts, counting steps, recording heart rate, and providing personalized recommendations based on user goals. Ensure the app has an intuitive and visually appealing interface to motivate users in achieving their fitness targets.",
          pdf_file: "",
          start_date: "2023/07/20",
          end_date: "2023/08/10",
          task_type: "PROJECT",
          subTaskInfo: [
            {
              task_label: "User profile and goal setting",
              task_detail: "Implement user goal setting functionality",
              task_id: "HCI0035_01",
            },
          ],
          active: true,
          assesment_criteria: [],
          __v: 0,
          studentTaskMap: [
            {
              _id: "64d2926d12f6a8ce7f628d22",
              user_id: "2117280009",
              task_id: "HCI0035",
              score: [],
              solution_zip: "",
              totalScore: 0,
              subtask_id: ["HCI0035_02", "HCI0035_03"],
              __v: 0,
            },
          ],
        },
      ],
      submitted_list: [],
      pending_list: [],
    };
    const taskDetailData = {
      key: "HCI0035",
      comments: {
        publisher:
          "There are several fitness tracking APIs and libraries available that you can integrate into your application. Explore options like Google Fit, Apple HealthKit, or Fitbit API to access fitness-related data and provide accurate tracking features. Focus on creating an engaging user experience to keep users motivated and engaged with the app.",
        assigner: "",
        student: "",
      },
      publisher_id: "2117280002",
      assigner_id: "2117280001",
      title: "Fitness Tracking App",
      summary:
        "Design and develop a fitness tracking application that helps users monitor their exercise and wellness activities. The app should include features like tracking workouts, counting steps, recording heart rate, and providing personalized recommendations based on user goals. Ensure the app has an intuitive and visually appealing interface to motivate users in achieving their fitness targets.",
      pdf_file: "",
      start_date: "2023/07/20",
      end_date: "2023/08/10",
      task_type: "PROJECT",
      subTaskInfo: [
        {
          task_label: "User profile and goal setting",
          task_detail: "Implement user goal setting functionality",
          task_id: "HCI0035_01",
        },
      ],
      active: true,
      assesment_criteria: [],
      __v: 0,
      studentTaskMap: [
        {
          _id: "64d2926d12f6a8ce7f628d22",
          user_id: "2117280009",
          task_id: "HCI0035",
          score: [],
          solution_zip: "",
          totalScore: 0,
          subtask_id: ["HCI0035_02", "HCI0035_03"],
          __v: 0,
        },
      ],
    };

    //const route ='mentor/project/ACTIVE'
    renderWithProviders(
      <BrowserRouter>
        <TaskDetail activeTask={false} taskData={taskDetailData} />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          mentorTaskInfo: mentorTaskInfo,
        },
      }
    );
    const trackProgressBtn = await screen.getByRole("button", {
      name: /Show subtask details/i,
    });
    expect(trackProgressBtn).toBeInTheDocument();
  });
});
