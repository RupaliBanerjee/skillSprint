import React, { useEffect } from "react";
import { assignmentData, projectData } from "../../../data/mockData";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Header from "common/Header";
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
  
  
 /* After score changes update the redux store and the db with new scores */
  const updateTaskData = (taskData) => {
    axios
      .post("/lecturer/updateTaskMap/score", { taskData: taskData })
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
  console.log("Check Assignment in Evaluate Page",assignment)
  console.log("Check project in Evaluate Page",project)
  // useEffect(() => {
  //   tabInfo = [
  //     {
  //       tabName: "Assignments",
  //       tabData: assignment,
  //       type: "Lecturer Task",
  //     },
  //     {
  //       tabName: "Projects",
  //       tabData: project,
  //       type: "Lecturer Task",
  //     },
  //   ];
  // }, [assignment, project]);

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
