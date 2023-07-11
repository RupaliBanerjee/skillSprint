import React, { useEffect } from "react";
import { assignmentData, projectData } from "../../../data/mockData";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Header from "components/Header";
import BasicTabs from "../../../components/BasicTabs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateAssesmentData } from "store/lecturerTaskInfo/lecturerTaskInfoSlice";
import { TASK_TYPES } from "constants";

const EvaluateMainPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { assignment, project } = useSelector(
    (state) => state.lecturer_Task_Info.pending_assesment_list
  );
  const dispatch = useDispatch();
  const taskId_List = assignment.map((t) => t.key);
  taskId_List.push(...project.map((t) => t.key));

  const assignmentData = [];

  const createTaskDetail = (studentData) => {
    // return {...assignment.map((t)=>t.key===studentData.task_id)}
  };

  const create_student_detail_list = (studentDetailList) => {
    const updateted_assignment_list = [];
    const updateted_project_list = [];
    /* To add the details of Student Map to the assignment and project array in store */
    assignment.forEach((task) => {
      const studentData = {
        ...studentDetailList.filter(
          (t) => t.task_id === task.key && t.totalScore === 0
        )[0],
      };
      const updated_assignment_data = {
        ...task,
        studentTaskMap: studentData,
      };
      /* Only if the student Map has a total score as 0 then add in pending taskList */
      if (Object.keys(updated_assignment_data.studentTaskMap).length) {
        updateted_assignment_list.push(updated_assignment_data);
      }
    });
    project.forEach((task) => {
      const studentData = {
        ...studentDetailList.filter(
          (t) => t.task_id === task.key && t.totalScore === 0
        )[0],
      };
      const updated_project_data = {
        ...task,
        studentTaskMap: studentData,
      };
      if (Object.keys(updated_project_data.studentTaskMap).length) {
        updateted_project_list.push(updated_project_data);
      }
    });
    dispatch(
      updateAssesmentData({
        assignment: updateted_assignment_list,
        project: updateted_project_list,
      })
    );
    // console.log("Check New project List",updateted_assignment_list)
  };

  useEffect(() => {
    axios
      .post("/getStudentTaskMap", { taskId_List: taskId_List })
      .then((response) => {
        create_student_detail_list(response.data.taskMapData);
      });
  }, []);

  /* After score changes update the redux store and the db with new scores */
  const updateTaskData = (taskData) => {
    console.log("Check if the data is correct", taskData);
    axios
      .post("/updateTaskMap/score", { taskData: taskData })
      .then((response) => {
        let changed_assignment_data = [];
        let changed_project_data = [];
        if (taskData.task_type === TASK_TYPES.ASSIGNMENT) {
          changed_assignment_data = assignment.filter(
            (task) => task.key !== taskData.key
          );
        } else {
          changed_project_data = project.map(
            (task) => task.key !== taskData.key
          );
        }
        dispatch(
          updateAssesmentData({
            assignment: changed_assignment_data.length
              ? changed_assignment_data
              : assignment,
            project: changed_project_data.length
              ? changed_project_data
              : project,
          })
        );
      });
  };
  let tabInfo = [
    {
      tabName: "Assignments",
      tabData: assignment,
      type: "Lecturer Task",
    },
    {
      tabName: "Projects",
      tabData: project,
      type: "Lecturer Task",
    },
  ];
  useEffect(() => {
    tabInfo = [
      {
        tabName: "Assignments",
        tabData: assignment,
        type: "Lecturer Task",
      },
      {
        tabName: "Projects",
        tabData: project,
        type: "Lecturer Task",
      },
    ];
  }, [assignment, project]);

  return (
    <Box m="10px 20px">
      {/* HEADER */}
      <Box
        display="flex"
        mb={"10px"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="View All Task" subtitle="Start new Task evaluation" />
      </Box>
      <Box flex="1 1 100%" height="75vh" backgroundColor={colors.primary[400]}>
        <BasicTabs tabInfo={tabInfo} updateTaskData={updateTaskData} />
      </Box>
    </Box>
  );
};

export default EvaluateMainPage;
