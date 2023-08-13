import { getByRole, getByText, render, screen } from "@testing-library/react";
import { renderWithProviders } from "mockProviderRedux/test-utils";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

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

/* To Mock URL Params */
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    pageType: "mainPage",
  }),
  useRouteMatch: () => ({ url: "/evaluate/mainPage" }),
}));

describe("test all lecturer account evaluate functionality", () => {
  /* Test 'Solution' button visibility for evaluation page */
  it("render solution download button for submitted tasks", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280001",
      userData: {
        first_name: "John",
        last_name: "Doe",
        role: "lecturer",
      },
      error: "",
      account_type: "lecturer",
    };
    const lecturer_Task_Info = {
      active_assignment_list: [],
      active_project_list: [],
      pending_assesment_list: [
        {
          assignment: [
            {
              comments: {
                publisher:
                  "Consider using a combination of frontend and backend technologies such as React, Node.js, and MongoDB to build the app. Integration with popular payment gateways like Stripe can be beneficial for ticketing functionality.",
                assigner: "",
                student: "",
              },
              _id: "64d2926d12f6a8ce7f628d75",
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
                  _id: "64d2926d12f6a8ce7f628cd2",
                  user_id: "2117280000",
                  task_id: "HCI0005",
                  score: [
                    {
                      name: "accuracy",
                      weightage: 0,
                      _id: "64d2926d12f6a8ce7f628cd3",
                    },
                    {
                      name: "basic functionality",
                      weightage: 0,
                      _id: "64d2926d12f6a8ce7f628cd4",
                    },
                    {
                      name: "code quality",
                      weightage: 0,
                      _id: "64d2926d12f6a8ce7f628cd5",
                    },
                    {
                      name: "documentation",
                      weightage: 0,
                      _id: "64d2926d12f6a8ce7f628cd6",
                    },
                  ],
                  solution_zip:
                    "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
                  totalScore: 0,
                  subtask_id: [],
                  __v: 0,
                },
              ],
            },
          ],
        },
      ],
      unAssigned_project_list: [],
    };
    const taskDetailData =
      lecturer_Task_Info.pending_assesment_list[0].assignment[0];
    renderWithProviders(
      <BrowserRouter>
        <TaskDetail taskData={taskDetailData} />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          lecturer_Task_Info: lecturer_Task_Info,
        },
      }
    );
    const solution_download_button = await screen.findByRole("button", {
      name: "Download Solution Zip",
    });
    expect(solution_download_button).toBeInTheDocument();
  });

  /* Test 'Add Score' button visibility for evaluation page */
  // it("render add score button for submitted tasks", async () => {
  //   const userData = {
  //     loading: false,
  //     logged_in_userId: "2117280001",
  //     userData: {
  //       first_name: "John",
  //       last_name: "Doe",
  //       role: "lecturer",
  //     },
  //     error: "",
  //     account_type: "lecturer",
  //   };
  //   const lecturer_Task_Info = {
  //     active_assignment_list: [],
  //     active_project_list: [],
  //     pending_assesment_list: [
  //       {
  //         project: [
  //           {
  //             comments: {
  //               publisher:
  //                 "Consider incorporating banking APIs or partnering with financial institutions to access banking services and ensure secure transactions. Focus on implementing multi-factor authentication, transaction encryption, and real-time balance updates.",
  //               assigner: "",
  //               student: "",
  //             },
  //             _id: "64d2926d12f6a8ce7f628d64",
  //             key: "HCI0027",
  //             publisher_id: "2117280002",
  //             assigner_id: "2117280001",
  //             title: "Online Banking App",
  //             summary:
  //               "Design and develop an online banking application that allows users to manage their finances and perform banking transactions. The app should include features like account balance checking, fund transfers, bill payments, and transaction history. Implement a secure and intuitive interface to ensure a smooth banking experience for users.",
  //             pdf_file: "",
  //             start_date: "2023/06/25",
  //             end_date: "2023/07/15",
  //             task_type: "PROJECT",
  //             subTaskInfo: [
  //               {
  //                 task_label: "Account Settings and Preferences",
  //                 task_detail:
  //                   "Create a page where users can manage their account settings, update personal information",
  //                 task_repo: "",
  //                 task_id: "HCI0027_01",
  //                 _id: "64d2926d12f6a8ce7f628d65",
  //               },
  //               {
  //                 task_label: "Secure Messaging",
  //                 task_detail:
  //                   "Implement a secure messaging feature that enables users to communicate with the bank's customer support",
  //                 task_repo: "",
  //                 task_id: "HCI0027_02",
  //                 _id: "64d2926d12f6a8ce7f628d66",
  //               },
  //               {
  //                 task_label: "Account Alerts and Notifications",
  //                 task_detail:
  //                   "Develop a system for sending real-time alerts and notifications to users",
  //                 task_repo: "",
  //                 task_id: "HCI0027_03",
  //                 _id: "64d2926d12f6a8ce7f628d67",
  //               },
  //             ],
  //             active: false,
  //             assesment_criteria: [],
  //             __v: 0,
  //             studentTaskMap: [
  //               {
  //                 _id: "64d2926d12f6a8ce7f628d1d",
  //                 user_id: "2117280009",
  //                 task_id: "HCI0027",
  //                 score: [
  //                   {
  //                     name: "accuracy",
  //                     weightage: 0,
  //                     _id: "64d2926d12f6a8ce7f628d1e",
  //                   },
  //                   {
  //                     name: "basic functionality",
  //                     weightage: 0,
  //                     _id: "64d2926d12f6a8ce7f628d1f",
  //                   },
  //                   {
  //                     name: "code quality",
  //                     weightage: 0,
  //                     _id: "64d2926d12f6a8ce7f628d20",
  //                   },
  //                   {
  //                     name: "documentation",
  //                     weightage: 0,
  //                     _id: "64d2926d12f6a8ce7f628d21",
  //                   },
  //                 ],
  //                 solution_zip:
  //                   "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
  //                 totalScore: 0,
  //                 subtask_id: ["HCI0027_01", "HCI0027_02", "HCI0027_03"],
  //                 __v: 0,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     unAssigned_project_list: [],
  //   };
  //   const taskDetailData =
  //     lecturer_Task_Info.pending_assesment_list[0].project[0];
  //   renderWithProviders(
  //     <BrowserRouter>
  //     <TaskDetail taskData={taskDetailData} />
  //     </BrowserRouter>,
  //     {
  //       preloadedState: {
  //         userInfo: userData,
  //         lecturer_Task_Info: lecturer_Task_Info,
  //       },
  //     }
  //   );
  //   const start_evaluation_button = await screen.findByTestId("add-score-btn");
  //   expect(start_evaluation_button).toBeInTheDocument();
  // });
});
