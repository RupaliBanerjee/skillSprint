import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "mockProviderRedux/test-utils";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";
import ViewTask from "./viewTask";
import TaskDetail from "./taskDetail";
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

describe("test all student account functionality", () => {

  /* Test if the published assignment list is rendered correctly*/
  it(" published assignment list based on unassigned_Task count from redux store", () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280000",
      userData: {
        first_name: "John",
        last_name: "Smith",
        role: "student",
      },
      error: "",
      account_type: "student",
    };
    const userTaskDetail = {
      active_Task: [],
      submitted_Task: [],
      unAssigned_Task: [
        {
          key: "HCI0006",
          publisher_id: "2117280001",
          assigner_id: "",
          title: "Home Automation System",
          summary:
            "Develop a home automation system that allows users to control various aspects of their home, such as lighting, temperature, and security, through a centralized interface. Implement features like scheduling, remote access, and integration with smart devices.",
          comments: {
            publisher:
              "Consider using IoT technologies and protocols such as MQTT or Zigbee for communication between the home automation system and smart devices. Use a responsive web application or a mobile app for the control interface.",
            assigner: "",
            student: "",
          },
          start_date: "2023/07/12",
          end_date: "2023/08/04",
          task_type: "ASSIGNMENT",
          active: true,
          pdf_file: "",
          assesment_criteria: [
            "accuracy",
            "basic functionality",
            "code quality",
            "documentation",
          ],
        },
        {
          key: "HCI0007",
          publisher_id: "2117280001",
          assigner_id: "",
          title: "Recipe Organizer App",
          summary:
            "Create a recipe organizer application that allows users to save, categorize, and share their favorite recipes. The app should provide features such as recipe search, ingredient management, and meal planning. Design a user-friendly interface that enhances the cooking and recipe discovery experience.",
          comments: {
            publisher:
              "Consider integrating with popular recipe APIs like Spoonacular or Edamam to fetch recipe data. Use a modern frontend framework like React or Vue.js for building the app.",
            assigner: "",
            student: "",
          },
          start_date: "2023/07/12",
          end_date: "2023/08/05",
          task_type: "ASSIGNMENT",
          active: true,
          pdf_file: "",
          assesment_criteria: [
            "accuracy",
            "basic functionality",
            "code quality",
            "documentation",
          ],
        },
      ],
    };
    renderWithProviders(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          userTaskDetail: userTaskDetail,
        },
      }
    );
    const list = screen.getAllByTestId("publish-assignment-list-item");
    expect(list.length).toEqual(2);
  });
  
  /* Validate the count of active assignments */
  it("validate Active Assignment count for students", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280000",
      userData: {
        first_name: "John",
        last_name: "Smith",
        role: "student",
      },
      error: "",
      account_type: "student",
    };
    const userTaskDetail = {
      active_Task: [
        {
          user_id: "2117280000",
          task_id: "HCI0033",
          score: [
            {
              name: "accuracy",
              weightage: 0,
              _id: "64cabeea1c72ecbccffbf0c1",
            },
            {
              name: "basic functionality",
              weightage: 0,
              _id: "64cabeea1c72ecbccffbf0c2",
            },
            {
              name: "code quality",
              weightage: 0,
              _id: "64cabeea1c72ecbccffbf0c3",
            },
            {
              name: "documentation",
              weightage: 0,
              _id: "64cabeea1c72ecbccffbf0c4",
            },
          ],
          solution_zip: "",
          totalScore: 0,
          subtask_id: [],
          __v: 0,
          task_detail: {
            summary:
              "Develop a recipe application that allows users to search, save, and explore various recipes. The app should include features like recipe search by ingredients, favorite recipes, and step-by-step instructions with images. Implement a visually appealing design and ensure the app provides a smooth and enjoyable experience for users to discover and try new recipes.",
            title: "Recipe App",
            comments: {
              publisher:
                "You can utilize recipe APIs like Spoonacular or Edamam to fetch recipes and related information. Consider implementing features like meal planning, shopping list generation, or dietary restrictions to enhance the functionality of the recipe app. Pay attention to the presentation of recipes, including high-quality images and clear instructions.",
              assigner: "",
              student: "",
            },
            start_date: "2023/07/25",
            end_date: "2023/08/14",
            active: false,
            task_type: "ASSIGNMENT",
            pdf_file: "",
          },
        },
      ],
      submitted_Task: [],
      unAssigned_Task: [],
    };

    renderWithProviders(
      <BrowserRouter>
        <ViewTask />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          userTaskDetail: userTaskDetail,
        },
      }
    );
    const list = await screen.getAllByTestId(/ASSIGNMENT/i);
    expect(list.length).toEqual(1);
  });

  /* upload solution button validation */
  it("validate taskDetails page upload solution button", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280000",
      userData: {
        first_name: "John",
        last_name: "Smith",
        role: "student",
      },
      error: "",
      account_type: "student",
    };
    const userTaskDetail = {
      active_Task: [],
      submitted_Task: [],
      unAssigned_Task: [],
    };
    const taskData = {
      user_id: "2117280000",
      task_id: "HCI0033",
      score: [
        {
          name: "accuracy",
          weightage: 0,
          _id: "64cabeea1c72ecbccffbf0c1",
        },
        {
          name: "basic functionality",
          weightage: 0,
          _id: "64cabeea1c72ecbccffbf0c2",
        },
        {
          name: "code quality",
          weightage: 0,
          _id: "64cabeea1c72ecbccffbf0c3",
        },
        {
          name: "documentation",
          weightage: 0,
          _id: "64cabeea1c72ecbccffbf0c4",
        },
      ],
      solution_zip: "",
      totalScore: 0,
      subtask_id: [],
      __v: 0,
      task_detail: {
        summary:
          "Develop a recipe application that allows users to search, save, and explore various recipes. The app should include features like recipe search by ingredients, favorite recipes, and step-by-step instructions with images. Implement a visually appealing design and ensure the app provides a smooth and enjoyable experience for users to discover and try new recipes.",
        title: "Recipe App",
        comments: {
          publisher:
            "You can utilize recipe APIs like Spoonacular or Edamam to fetch recipes and related information. Consider implementing features like meal planning, shopping list generation, or dietary restrictions to enhance the functionality of the recipe app. Pay attention to the presentation of recipes, including high-quality images and clear instructions.",
          assigner: "",
          student: "",
        },
        start_date: "2023/07/25",
        end_date: "2023/08/14",
        active: true,
        task_type: "ASSIGNMENT",
        pdf_file: "",
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <TaskDetail taskData={taskData} activeTask={true} />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          userTaskDetail: userTaskDetail,
        },
      }
    );
    const fileUploadIcon = await screen.getByRole("button", {
      name: /Upload Solution/i,
    });
    expect(fileUploadIcon).toBeInTheDocument();
  });

  /* Enroll now button validation */
  it("validate taskDetails page enroll now button", async () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280000",
      userData: {
        first_name: "John",
        last_name: "Smith",
        role: "student",
      },
      error: "",
      account_type: "student",
    };
    const userTaskDetail = {
      active_Task: [],
      submitted_Task: [],
      unAssigned_Task: [],
    };
    const taskData = {
      comments: {
        publisher:
          "Consider using IoT technologies and protocols such as MQTT or Zigbee for communication between the home automation system and smart devices. Use a responsive web application or a mobile app for the control interface.",
        assigner: "",
        student: "",
      },
      _id: "64cabeea1c72ecbccffbf100",
      key: "HCI0006",
      publisher_id: "2117280001",
      assigner_id: "",
      title: "Home Automation System",
      summary:
        "Develop a home automation system that allows users to control various aspects of their home, such as lighting, temperature, and security, through a centralized interface. Implement features like scheduling, remote access, and integration with smart devices.",
      pdf_file: "",
      start_date: "2023/07/12",
      end_date: "2023/08/04",
      task_type: "ASSIGNMENT",
      active: true,
      assesment_criteria: [
        "accuracy",
        "basic functionality",
        "code quality",
        "documentation",
      ],
      subTaskInfo: [],
      __v: 0,
    };
    renderWithProviders(
      <BrowserRouter>
        <TaskDetail taskData={taskData} activeTask={false} />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          userTaskDetail: userTaskDetail,
        },
      }
    );
    const fileUploadIcon = await screen.getByRole("button", {
      name: /Enroll Now/i,
    });
    expect(fileUploadIcon).toBeInTheDocument();
  });

  /* Hidden button check on task Details page for student */
  it("validate hidden buttons on taskDetails page",async()=>{
    const userData = {
        loading: false,
        logged_in_userId: "2117280000",
        userData: {
          first_name: "John",
          last_name: "Smith",
          role: "student",
        },
        error: "",
        account_type: "student",
      };
      const userTaskDetail = {
        active_Task: [],
        submitted_Task: [],
        unAssigned_Task: [],
      };
      const taskData = {
        user_id: "2117280000",
        task_id: "HCI0033",
        score: [
          {
            name: "accuracy",
            weightage: 0,
            _id: "64cabeea1c72ecbccffbf0c1",
          },
          {
            name: "basic functionality",
            weightage: 0,
            _id: "64cabeea1c72ecbccffbf0c2",
          },
          {
            name: "code quality",
            weightage: 0,
            _id: "64cabeea1c72ecbccffbf0c3",
          },
          {
            name: "documentation",
            weightage: 0,
            _id: "64cabeea1c72ecbccffbf0c4",
          },
        ],
        solution_zip: "",
        totalScore: 0,
        subtask_id: [],
        __v: 0,
        task_detail: {
          summary:
            "Develop a recipe application that allows users to search, save, and explore various recipes. The app should include features like recipe search by ingredients, favorite recipes, and step-by-step instructions with images. Implement a visually appealing design and ensure the app provides a smooth and enjoyable experience for users to discover and try new recipes.",
          title: "Recipe App",
          comments: {
            publisher:
              "You can utilize recipe APIs like Spoonacular or Edamam to fetch recipes and related information. Consider implementing features like meal planning, shopping list generation, or dietary restrictions to enhance the functionality of the recipe app. Pay attention to the presentation of recipes, including high-quality images and clear instructions.",
            assigner: "",
            student: "",
          },
          start_date: "2023/07/25",
          end_date: "2023/08/14",
          active: true,
          task_type: "ASSIGNMENT",
          pdf_file: "",
        },
      };

    renderWithProviders(
        <BrowserRouter>
        <TaskDetail taskData={taskData} activeTask={true} />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
          userTaskDetail: userTaskDetail,
        },
      }
    );
    const downloadSolutionBtn=await screen.queryByRole("button",{name: "Solution"});
    expect(downloadSolutionBtn).toBeFalsy();
    const evaluateBtn=await screen.queryByRole("button",{name:/Add Score/i});
    expect(evaluateBtn).toBeFalsy();
  })
});
